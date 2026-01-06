import { setStore, KEYS } from "./core";
import { buildAuth, normalizeRole } from "./auth.utils";
import { http } from "./http";

export class AuthService {
  constructor() {
    this.roleNameToId = new Map();
  }

  splitName(name) {
    const parts = (name || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { firstName: "User", lastName: "User" };
    if (parts.length === 1) return { firstName: parts[0], lastName: "User" };
    return { firstName: parts[0], lastName: parts[parts.length - 1] };
  }

  syncRoleMap(users = []) {
    users.forEach((user) => {
      const roleName = user?.role?.name;
      const roleId = user?.role?._id;
      if (roleName && roleId) {
        this.roleNameToId.set(roleName.toLowerCase(), roleId);
      }
    });
  }

  async getRoleIdByName(roleName) {
    const key = (roleName || "").toLowerCase();
    const cached = this.roleNameToId.get(key);
    if (cached) return cached;

    const { data } = await http.get("/users", { params: { limit: 100 } });
    const users = data?.data?.users || [];
    this.syncRoleMap(users);
    return this.roleNameToId.get(key) || null;
  }

  async login(email, password) {
    const { data } = await http.post("/auth/login", { email, password });
    const user = data?.data?.user;
    const token = data?.data?.accessToken;

    const auth = buildAuth(user, token);
    setStore(KEYS.AUTH, auth);
    return auth;
  }

  async register(name, email, password) {
    const { firstName, lastName } = this.splitName(name);
    await http.post("/auth/register", {
      email,
      password,
      firstName,
      lastName,
    });
    return this.login(email, password);
  }

  async getUsers() {
    const { data } = await http.get("/users", { params: { limit: 100 } });
    const users = data?.data?.users || [];
    this.syncRoleMap(users);

    return users.map((user) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      role: normalizeRole(user.role?.name || user.role),
    }));
  }

  async updateUserRole(userId, role) {
    const roleId = await this.getRoleIdByName(role);
    if (!roleId) {
      throw new Error(`Role mapping not found for ${role}`);
    }

    const { data } = await http.put(`/users/${userId}`, { roleId });
    const user = data?.data?.user;
    if (user) this.syncRoleMap([user]);

    return user
      ? {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`.trim(),
          email: user.email,
          role: normalizeRole(user.role?.name || user.role),
        }
      : null;
  }

  logout() {
    http.post("/auth/logout").catch(() => {
      // Ignore logout errors and clear local auth state regardless.
    });
    localStorage.removeItem(KEYS.AUTH);
  }

  getStoredAuth() {
    const auth = localStorage.getItem(KEYS.AUTH);
    if (!auth) return null;
    const parsed = JSON.parse(auth);
    if (parsed?.user?._id && !parsed.user.id) {
      parsed.user.id = parsed.user._id;
    }
    return parsed;
  }
}

/* -------- Singleton export -------- */
export const authApi = new AuthService();
