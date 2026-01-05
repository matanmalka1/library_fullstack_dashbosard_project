
import { AuthState, User, UserRole } from '../types';

const AUTH_KEY = 'auth';
const USERS_KEY = 'users';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthState> => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    
    const { password: _, ...userNoPass } = user;
    const auth = { user: userNoPass as User, token: 'jwt-' + Date.now(), isAuthenticated: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    return auth;
  },

  register: async (name: string, email: string, password: string): Promise<AuthState> => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find((u: any) => u.email === email)) throw new Error('User already exists');
    
    const newUser = { id: Date.now().toString(), name, email, password, role: UserRole.USER };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const { password: _, ...userNoPass } = newUser;
    const auth = { user: userNoPass as User, token: 'jwt-' + Date.now(), isAuthenticated: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    return auth;
  },

  logout: () => localStorage.removeItem(AUTH_KEY),
  
  getStoredAuth: (): AuthState | null => {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
  }
};
