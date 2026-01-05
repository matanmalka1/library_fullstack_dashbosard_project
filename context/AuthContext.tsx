
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isManager: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const stored = api.getStoredAuth();
    if (stored) setAuthState(stored);
  }, []);

  const login = async (email: string, password: string) => {
    const auth = await api.login(email, password);
    setAuthState(auth);
  };

  const register = async (name: string, email: string, password: string) => {
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
