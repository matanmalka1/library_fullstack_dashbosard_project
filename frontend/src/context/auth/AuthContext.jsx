import { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "../../types";
import { authService } from "../../services/AuthService";
import { subscribeAuthState } from "../../services/auth/authStore";
import { getTokenExpiry, isTokenExpired } from "../../services/auth/authUtils";
import { normalizeRole } from "../../services/shared/normalize";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const emptyAuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
  };
  const [authState, setAuthState] = useState(emptyAuthState);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const hydrateAuth = async () => {
      const stored = authService.getStoredAuth();

      if (stored?.token && !isTokenExpired(stored.token)) {
        if (isActive) {
          setAuthState(stored);
          setIsAuthLoading(false);
        }
        return;
      }

      // Only attempt refresh if we have stored auth (valid refresh token)
      if (!stored) {
        if (isActive) {
          setIsAuthLoading(false);
        }
        return;
      }

      try {
        const refreshed = await authService.refreshAccessToken(stored);
        if (isActive) {
          setAuthState(refreshed);
          setIsAuthLoading(false);
        }
      } catch {
        authService.logout();
        if (isActive) {
          setAuthState(emptyAuthState);
          setIsAuthLoading(false);
        }
      }
    };

    hydrateAuth();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    return subscribeAuthState((nextState) => {
      setAuthState(nextState);
    });
  }, []);

  useEffect(() => {
    if (!authState?.token) return undefined;
    const expiry = getTokenExpiry(authState.token);
    if (!expiry) return undefined;

    const refreshAt = expiry - 60 * 1000;
    const delay = Math.max(refreshAt - Date.now(), 0);

    const timeoutId = setTimeout(async () => {
      try {
        const refreshed = await authService.refreshAccessToken(authState);
        setAuthState(refreshed);
      } catch {
        authService.logout();
        setAuthState(emptyAuthState);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [authState]);

  const login = async (email, password) => {
    const auth = await authService.login(email, password);
    setAuthState(auth);
  };

  const register = async (firstName, lastName, email, password) => {
    const auth = await authService.register(
      firstName,
      lastName,
      email,
      password
    );
    setAuthState(auth);
  };

  const logout = () => {
    authService.logout();
    setAuthState(emptyAuthState);
  };

  const updateUser = (updatedUser) => {
    setAuthState((prevState) => ({
      ...prevState,
      user: updatedUser,
    }));
  };

  const normalizedRole = normalizeRole(authState.user?.role);
  const value = {
    ...authState,
    login,
    register,
    logout,
    updateUser,
    isAuthLoading,
    isAdmin: normalizedRole === UserRole.ADMIN,
    isManager:
      normalizedRole === UserRole.MANAGER || normalizedRole === UserRole.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
