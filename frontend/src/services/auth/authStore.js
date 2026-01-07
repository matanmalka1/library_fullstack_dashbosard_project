const AUTH_STORAGE_KEY = "auth";

const emptyAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Initialize auth state from localStorage on module load
const loadAuthFromStorage = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
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

const notify = () => {
  listeners.forEach((listener) => listener(authState));
};

export const getAuthState = () => authState;

export const setAuthState = (nextState) => {
  authState = normalizeAuthState(nextState);
  // Persist to localStorage
  try {
    if (authState.isAuthenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
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
    localStorage.removeItem(AUTH_STORAGE_KEY);
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

export const clearLegacyAuthStorage = () => {
  clearAuthState();
};

