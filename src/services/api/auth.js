import { getStore, setStore, KEYS } from "./core";

/* Simple user roles as plain JS constants */
const UserRole = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export class AuthService {
  async login(email, password) {
    const users = getStore(KEYS.USERS) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const { password: _password, ...userNoPass } = user;

    const auth = {
      user: userNoPass,
      token: `jwt-${Date.now()}`,
      isAuthenticated: true,
    };

    setStore(KEYS.AUTH, auth);
    return auth;
  }

  async register(name, email, password) {
    // Removed ': string' type annotations
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

    const { password: _password, ...userNoPass } = newUser;

    const auth = {
      user: userNoPass,
      token: `jwt-${Date.now()}`,
      isAuthenticated: true,
    };

    setStore(KEYS.AUTH, auth);
    return auth;
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
