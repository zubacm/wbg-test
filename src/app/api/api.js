import axios from "axios";
import {
  getCredentials,
  isJwtExpired,
  logout,
  storeCredentials,
} from "./auth/indexdb";
import { getToken } from "./auth/queries";

const username = "tomislav";
const password = "tomislav wp 2k24!";

const api = axios.create({
  headers: {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json;charset=UTF-8",
    // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
    // Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
  },
  baseURL: "https://westbalkanguide.com/wp-json/wp/v2", // window.env.REACT_APP_BASE_URL_API,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

let isRefreshing = false;
let refreshPromise = null;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}
function onRefreshed(token) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

// ---- request: attach token ----
api.interceptors.request.use(async (config) => {
  const cred = await getCredentials();

  const token = cred?.token;

  if (token && isJwtExpired(token, 30)) {
    const newData = getToken({
      username: cred?.username,
      password: cred?.password,
    });
    const refreshToken = newData?.token;

    storeCredentials({
      ...cred,
      token: refreshToken,
    });

    if (!refreshToken) throw new Error("No refresh token");

    config.headers.Authorization = `Bearer ${refreshToken}`;
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- function that calls your refresh endpoint ----
async function refreshAccessToken() {
  const cred = await getCredentials();

  const newData = getToken({
    username: cred?.username,
    password: cred?.password,
  });
  const refreshToken = newData?.token;

  if (!refreshToken) throw new Error("No refresh token");

  // setAccessToken(newAccess);
  storeCredentials({
    ...cred,
    token: refreshToken,
  });

  return newAccess;
}

// ---- response: if 401, refresh then retry original ----
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;

    // avoid infinite loop
    if (!original || original._retry) throw error;

    if (error.response?.status === 401) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken()
          .then((newToken) => {
            onRefreshed(newToken);
            return newToken;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      // wait for the refresh, then retry with new token
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        });

        // if refresh fails, bubble it and log out
        refreshPromise?.catch((e) => {
          // clearTokens();
          logout();
          reject(e);
        });
      });
    }

    throw error;
  },
);

export const api2 = axios.create({
  headers: {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json;charset=UTF-8",
    // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
    // Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
  },
  baseURL: "https://westbalkanguide.com/wp-json/jwt-auth/v1", // window.env.REACT_APP_BASE_URL_API,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export const apiCustom = axios.create({
  headers: {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json;charset=UTF-8",
    // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
    Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
  },
  baseURL: "https://westbalkanguide.com/wp-json/custom/v1", // window.env.REACT_APP_BASE_URL_API,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export default api;
