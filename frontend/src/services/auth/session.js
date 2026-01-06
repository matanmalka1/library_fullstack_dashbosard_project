import { buildAuth, getStoredAuth, getTokenExpiry } from "./utils";
import {
  clearAuthState,
  clearLegacyAuthStorage,
  getAccessToken,
  setAuthState,
} from "./store";
import { http } from "../shared/http";

const REFRESH_THRESHOLD_MS = 60 * 1000;

let refreshPromise = null;

const requestRefresh = async (currentAuth) => {
  // Use http instance with skipAuthRefresh to avoid infinite loop
  const { data } = await http.post("/auth/refresh", null, {
    skipAuthRefresh: true,
  });
  const token = data?.data?.accessToken;
  if (!token) {
    throw new Error("Token refresh failed");
  }

  let user = currentAuth?.user || getStoredAuth()?.user;
  if (!user) {
    // Fetch user profile with new token
    const meResponse = await http.get("/auth/me", {
      skipAuthRefresh: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    user = meResponse?.data?.data?.user;
  }
  if (!user) {
    throw new Error("User not available after token refresh");
  }

  const auth = buildAuth(user, token);
  setAuthState(auth);
  return auth;
};

export const refreshAccessToken = async (currentAuth) => {
  if (refreshPromise) return refreshPromise;
  refreshPromise = requestRefresh(currentAuth).finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
};

export const ensureFreshAccessToken = async (currentAuth) => {
  const token = getAccessToken();
  if (!token) return null;

  const exp = getTokenExpiry(token);
  if (!exp) return token;

  const shouldRefresh = Date.now() >= exp - REFRESH_THRESHOLD_MS;
  if (!shouldRefresh) return token;

  const auth = await refreshAccessToken(currentAuth);
  return auth?.token || null;
};

export const forceLogout = () => {
  clearAuthState();
  clearLegacyAuthStorage();
};

