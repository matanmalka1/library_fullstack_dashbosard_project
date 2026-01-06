import { getStore, setStore, KEYS } from "./core";
import { UserRole } from "../../types";
import { buildAuth, stripPassword, syncStoredAuthRole } from "./auth.utils";

export class AuthService {
  async login(email, password) {
    const users = getStore(KEYS.USERS) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const auth = buildAuth(user);
    setStore(KEYS.AUTH, auth);
    return auth;
  }

  async register(name, email, password) {
    const users = getStore(KEYS.USERS) || [];

    if (users.some((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: UserRole.USER,
    };

    users.push(newUser);
    setStore(KEYS.USERS, users);

    const auth = buildAuth(newUser);
    setStore(KEYS.AUTH, auth);
    return auth;
  }

  async getUsers() {
    return getStore(KEYS.USERS) || [];
  }

  async updateUserRole(userId, role) {
    const users = getStore(KEYS.USERS) || [];
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) return null;

    users[index] = { ...users[index], role };
    setStore(KEYS.USERS, users);
    syncStoredAuthRole(userId, role);
    return users[index];
  }

  logout() {
    localStorage.removeItem(KEYS.AUTH);
  }

  getStoredAuth() {
    const auth = localStorage.getItem(KEYS.AUTH);
    return auth ? JSON.parse(auth) : null;
  }
}

/* -------- Singleton export -------- */
export const authApi = new AuthService();
