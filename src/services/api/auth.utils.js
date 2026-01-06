import { setStore, KEYS } from "./core";

export const stripPassword = (user) => {
  const { password: _password, ...userNoPass } = user;
  return userNoPass;
};

export const buildAuth = (user) => ({
  user: stripPassword(user),
  token: `jwt-${Date.now()}`,
  isAuthenticated: true,
});

export const syncStoredAuthRole = (userId, role) => {
  const rawAuth = localStorage.getItem(KEYS.AUTH);
  if (!rawAuth) return;

  const auth = JSON.parse(rawAuth);
  if (auth?.user?.id !== userId) return;

  setStore(KEYS.AUTH, {
    ...auth,
    user: { ...auth.user, role },
  });
};
