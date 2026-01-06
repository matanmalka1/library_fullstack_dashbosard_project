import axios from "axios";
import { KEYS, setStore } from "./core";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const rawAuth = localStorage.getItem(KEYS.AUTH);
  if (!rawAuth) return config;

  try {
    const { token } = JSON.parse(rawAuth);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignore malformed auth payloads and proceed without a token.
  }

  return config;
});

let isRefreshing = false;
let pendingRequests = [];

const processPending = (error, token) => {
  pendingRequests.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  pendingRequests = [];
};

const updateStoredToken = (token) => {
  const rawAuth = localStorage.getItem(KEYS.AUTH);
  if (!rawAuth) return;
  try {
    const auth = JSON.parse(rawAuth);
    setStore(KEYS.AUTH, { ...auth, token });
  } catch {
    // Ignore malformed auth payloads.
  }
};

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest || originalRequest.skipAuthRefresh) {
      return Promise.reject(error);
    }

    const isUnauthorized = error?.response?.status === 401;
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh");
    if (!isUnauthorized || originalRequest._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: (token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(http(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;
    try {
      const { data } = await http.post(
        "/auth/refresh",
        {},
        { skipAuthRefresh: true }
      );
      const token = data?.data?.accessToken;
      if (token) {
        updateStoredToken(token);
        http.defaults.headers.common.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      processPending(null, token);
      return http(originalRequest);
    } catch (refreshError) {
      processPending(refreshError, null);
      localStorage.removeItem(KEYS.AUTH);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
