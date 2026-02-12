import { useMutation, useQuery } from "@tanstack/react-query";
import api, { api2 } from "../api";

// ====================================================================================================

export const getToken = async (body) => {
  // const body = {
  //   username: "marina",
  //   password: "PKZt3*K39btfdq^Z7Tm$4v6H",
  // }
  const { data } = await api2.post(
    `/token`, body
  );

  return data;
};

export const useToken = (successCallbackFn, errorCallbackFn) => {
  return useMutation({
    mutationFn: getToken,
    onSuccess: (response) => {
      successCallbackFn?.(response);
    },
    onError: (response) => {
      errorCallbackFn?.(response);
    },
  });
};

async function getAppSecret() {
  const db = await openDB("auth", 1, {
    upgrade(db) {
      db.createObjectStore("meta");
    },
  });

  let secret = await db.get("meta", "secret");
  if (!secret) {
    secret = crypto.getRandomValues(new Uint8Array(32));
    await db.put("meta", secret, "secret");
  }

  return secret;
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
      iterations: 50_000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}



// --------------------------------------------------------------------------
async function encryptCreds(creds) {
  const secret = await getAppSecret();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(secret, salt);

  const data = new TextEncoder().encode(JSON.stringify(creds));

  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return { cipher, salt, iv };
}

// -----------------------------------------------------------------------
async function decryptCreds(stored) {
  const secret = await getAppSecret();
  const key = await deriveKey(secret, stored.salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: stored.iv },
    key,
    stored.cipher
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}