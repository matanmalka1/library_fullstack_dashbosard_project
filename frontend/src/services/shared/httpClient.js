import axios from "axios";
import { getAccessToken } from "../auth/authStore";
import {
  ensureFreshAccessToken,
  forceLogout,
  refreshAccessToken,
} from "../auth/authSession";
import { getStoredAuth } from "../auth/authUtils";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  if (!config.skipAuthRefresh) {
    try {
      await ensureFreshAccessToken(getStoredAuth());
    } catch {}
  }

  config.headers = config.headers || {};
  if (!config.headers.Authorization) {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status !== 401 || !originalRequest) {
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

      if (getAccessToken()) {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return httpClient(originalRequest);
    } catch (refreshError) {
      forceLogout();
      return Promise.reject(refreshError);
    }
  }
);
