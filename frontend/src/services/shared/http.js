import axios from "axios";
import { getAccessToken } from "../auth/store";
import { ensureFreshAccessToken, forceLogout, refreshAccessToken } from "../auth/session";
import { getStoredAuth } from "../auth/utils";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(async (config) => {
  if (!config.skipAuthRefresh) {
    try {
      await ensureFreshAccessToken(getStoredAuth());
    } catch {
      // Proceed and let the response handler decide on auth failures.
    }
  }

  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config;

    if (status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.skipAuthRefresh) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      forceLogout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      await refreshAccessToken(getStoredAuth());
      const token = getAccessToken();
      if (token) {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      return http(originalRequest);
    } catch (refreshError) {
      forceLogout();
      return Promise.reject(refreshError);
    }
  }
);

