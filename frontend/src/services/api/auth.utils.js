import { setStore, KEYS } from "./core";

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
  const normalizedUser = user?._id && !user.id ? { ...user, id: user._id } : user;
  return {
    user: normalizedUser,
    token: token || null,
    isAuthenticated: Boolean(normalizedUser && token),
  };
};

export const getStoredAuth = () => {
  const rawAuth = localStorage.getItem(KEYS.AUTH);
  if (!rawAuth) return null;
  const parsed = JSON.parse(rawAuth);
  if (parsed?.user?._id && !parsed.user.id) {
    parsed.user.id = parsed.user._id;
  }
  return parsed;
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

  setStore(KEYS.AUTH, {
    ...auth,
    user: { ...auth.user, role },
  });
};
