const AUTH_STORAGE_KEY = "auth";

const emptyAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const normalizeAuthState = (nextState) => {
  if (!nextState) return { ...emptyAuthState };
  const user = nextState.user || null;
  const token = nextState.token || null;
  return {
    user,
    token,
    isAuthenticated: Boolean(user && token),
  };
};

// Initialize auth state from sessionStorage on module load
const loadAuthFromStorage = () => {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { ...emptyAuthState };
    const parsed = JSON.parse(raw);
    if (parsed?.user || parsed?.token) {
      return normalizeAuthState(parsed);
    }
  } catch {
    // Ignore parse errors and use empty state
  }
  return { ...emptyAuthState };
};

let authState = loadAuthFromStorage();
const listeners = new Set();

const notify = () => {
  listeners.forEach((listener) => listener(authState));
};

export const getAuthState = () => authState;

export const setAuthState = (nextState) => {
  authState = normalizeAuthState(nextState);
  // Persist to sessionStorage
  try {
    if (authState.isAuthenticated) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
  notify();
};

export const setAuthUser = (user) => {
  authState = normalizeAuthState({ ...authState, user });
  notify();
};

export const setAccessToken = (token) => {
  authState = normalizeAuthState({ ...authState, token });
  notify();
};

export const clearAuthState = () => {
  authState = { ...emptyAuthState };
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
  notify();
};

export const getAccessToken = () => authState.token || null;

export const subscribeAuthState = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
