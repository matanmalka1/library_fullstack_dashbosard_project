
import { UserRole } from '../../types';
import { getStore, setStore, KEYS } from './core';

export const authApi = {
  login: async (email, password) => {
    const user = getStore(KEYS.USERS).find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    const { password: _, ...userNoPass } = user;
    const auth = { user: userNoPass, token: 'jwt-' + Date.now(), isAuthenticated: true };
    setStore(KEYS.AUTH, auth);
    return auth;
  },

  register: async (name, email, password) => {
    const users = getStore(KEYS.USERS);
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    const newUser = { id: Date.now().toString(), name, email, password, role: UserRole.USER };
    users.push(newUser);
    setStore(KEYS.USERS, users);
    const { password: _, ...userNoPass } = newUser;
    const auth = { user: userNoPass, token: 'jwt-' + Date.now(), isAuthenticated: true };
    setStore(KEYS.AUTH, auth);
    return auth;
  },

  logout: () => localStorage.removeItem(KEYS.AUTH),
  
  getStoredAuth: () => {
    const auth = localStorage.getItem(KEYS.AUTH);
    return auth ? JSON.parse(auth) : null;
  }
};
