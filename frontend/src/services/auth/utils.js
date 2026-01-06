import { getAuthState, setAuthState } from "./store";

export const normalizeRole = (role) => {
  if (!role) return null;
  if (typeof role === "string") return role.toUpperCase();
  if (typeof role === "object" && role.name) return role.name.toUpperCase();
  return null;
};

export const stripPassword = (user) => {
  const { password: _password, ...userNoPass } = user;
  return userNoPass;
};

export const buildAuth = (user, token) => {
  const normalizedUser = normalizeUser(user);
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
    user: normalizeUser(stored.user),
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

const normalizeUser = (user) => {
  if (!user) return user;
  const normalized = { ...user };
  if (normalized._id && !normalized.id) {
    normalized.id = normalized._id;
  }
  if (normalized.role && typeof normalized.role === "object") {
    normalized.role = normalized.role.name || normalized.role;
  }
  if (!normalized.name && (normalized.firstName || normalized.lastName)) {
    normalized.name = `${normalized.firstName || ""} ${normalized.lastName || ""}`.trim();
  }
  return normalized;
};

