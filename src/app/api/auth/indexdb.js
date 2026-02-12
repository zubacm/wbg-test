export function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("indexedDB is not available (SSR / non-browser environment)"));
      return;
    }

    const request = indexedDB.open("auth-db", 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("meta")) db.createObjectStore("meta");
      if (!db.objectStoreNames.contains("auth")) db.createObjectStore("auth");
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("IndexedDB open blocked (another tab still has it open)"));
  });
}

async function getAppSecret() {
  // Open the database
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open("auth-db", 2);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return new Promise((resolve, reject) => {
    const tx = db.transaction("meta", "readwrite");
    const store = tx.objectStore("meta");

    const getReq = store.get("secret");
    getReq.onsuccess = () => {
      let secret = getReq.result;
      if (!secret) {
        secret = crypto.getRandomValues(new Uint8Array(32));
        const putReq = store.put(secret, "secret");
        putReq.onsuccess = () => resolve(secret);
        putReq.onerror = (e) => reject(e);
      } else {
        resolve(secret);
      }
    };
    getReq.onerror = (e) => reject(e);
  });
}

async function deriveKey(secret, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    secret,
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 50000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/* =======================
   Store credentials
======================= */

export async function storeCredentials(username, password, token) {
  const secret = await getAppSecret();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(secret, salt);
  const data = new TextEncoder().encode(
    JSON.stringify({ username, password, token })
  );

  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const db = await openDB();
  const tx = db.transaction("auth", "readwrite");
  tx.objectStore("auth").put(
    { cipher, salt, iv, createdAt: Date.now() },
    "creds"
  );
}


/* =======================
   Read credentials
======================= */

export async function getCredentials() {
  const db = await openDB();

  return new Promise((resolve) => {
    const tx = db.transaction("auth", "readonly");
    const req = tx.objectStore("auth").get("creds");

    req.onsuccess = async () => {
      if (!req.result) return resolve(null);

      const secret = await getAppSecret();
      const key = await deriveKey(secret, req.result.salt);

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: req.result.iv },
        key,
        req.result.cipher
      );

      resolve(JSON.parse(new TextDecoder().decode(decrypted)));
    };
  });
}



export async function logout() {
  try {
    const db = await new Promise((resolve, reject) => {
      const req = indexedDB.open("auth-db", 2);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    const tx = db.transaction("auth", "readwrite");
    const store = tx.objectStore("auth");
    store.delete("creds");

    tx.oncomplete = () => {
      console.log("Credentials deleted, user logged out.");

      // Optional: clear any in-memory state if you had it
      // userState.username = null;
      // userState.password = null;

      // Optional: redirect or reload
      window.location.reload();
    };

    tx.onerror = (e) => {
      console.error("Failed to delete credentials:", e);
    };
  } catch (err) {
    console.error("Logout failed:", err);
  }
}

// JWT "exp" is seconds since epoch
export function isJwtExpired(token, skewSeconds = 30) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload?.exp;
    if (!exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return exp <= now + skewSeconds;
  } catch {
    return true;
  }
}