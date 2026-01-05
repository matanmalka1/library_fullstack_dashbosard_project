
import { UserRole } from '../types';

const AUTH_KEY = 'auth';
const USERS_KEY = 'users';

export const authApi = {
  login: async (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    
    const { password: _, ...userNoPass } = user;
    const auth = { user: userNoPass, token: 'jwt-' + Date.now(), isAuthenticated: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    return auth;
  },

  register: async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    
    const newUser = { id: Date.now().toString(), name, email, password, role: UserRole.USER };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const { password: _, ...userNoPass } = newUser;
    const auth = { user: userNoPass, token: 'jwt-' + Date.now(), isAuthenticated: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    return auth;
  },

  logout: () => localStorage.removeItem(AUTH_KEY),
  
  getStoredAuth: () => {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
  }
};
