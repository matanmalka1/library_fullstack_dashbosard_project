import axios from "axios";
import { KEYS } from "./core";

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
