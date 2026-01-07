import { normalizeRole, normalizeUser, stripPassword } from "../shared/normalize";
import { getAuthState, setAuthState } from "./authStore";

export const buildAuth = (user, token) => {
  const normalizedUser = normalizeUser(user, { normalizeRole });
  return {
    user: normalizedUser,
    token: token || null,
    isAuthenticated: Boolean(normalizedUser && token),
  };
};

export const getStoredAuth = () => {
  const stored = getAuthState();
  if (!stored?.user && !stored?.token) return null;
  return {
    ...stored,
    user: normalizeUser(stored.user, { normalizeRole }),
  };
};

export const requireUser = () => {
  const auth = getStoredAuth();
  if (!auth?.user) {
    throw new Error("Not authenticated.");
  }
  return auth.user;
};

export const requireRole = (roles) => {
  const user = requireUser();
  const normalizedRole = normalizeRole(user.role);
  if (!normalizedRole || !roles.includes(normalizedRole)) {
    throw new Error("Not authorized.");
  }
  return user;
};

export const syncStoredAuthRole = (userId, role) => {
  const auth = getStoredAuth();
  if (!auth) return;
  if (auth?.user?.id !== userId) return;

  setAuthState({
    ...auth,
    user: { ...auth.user, role },
  });
};

export const isTokenExpired = (token, skewSeconds = 30) => {
  if (!token) return true;
  const exp = getTokenExpiry(token);
  if (!exp) return true;
  return Date.now() >= exp - skewSeconds * 1000;
};

export const getTokenExpiry = (token) => {
  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) return null;
  return payload.exp * 1000;
};

const parseJwtPayload = (token) => {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};
