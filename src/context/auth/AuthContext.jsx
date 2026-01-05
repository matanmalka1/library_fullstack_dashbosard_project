
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from "../../types";
import { api } from "../../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const stored = api.getStoredAuth();
    if (stored) setAuthState(stored);
  }, []);

  const login = async (email, password) => {
    const auth = await api.login(email, password);
    setAuthState(auth);
  };

  const register = async (name, email, password) => {
    const auth = await api.register(name, email, password);
    setAuthState(auth);
  };

  const logout = () => {
    api.logout();
    setAuthState({ user: null, token: null, isAuthenticated: false });
  };

  const value = {
    ...authState,
    login,
    register,
    logout,
    isAdmin: authState.user?.role === UserRole.ADMIN,
    isManager: authState.user?.role === UserRole.MANAGER || authState.user?.role === UserRole.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
