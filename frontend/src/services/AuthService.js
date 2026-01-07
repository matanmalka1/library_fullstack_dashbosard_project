import { httpClient } from "./shared/httpClient";
import { normalizeUser, normalizeRole } from "./shared/normalize";
import { buildAuth, getStoredAuth } from "./auth/authUtils";
import { setAuthState } from "./auth/authStore";
import { forceLogout, refreshAccessToken } from "./auth/authSession";
import { BaseService } from "./BaseService";

class AuthServiceClass extends BaseService {
  constructor() {
    super();
    this.roleIdByName = new Map();
  }

  getStoredAuth() {
    return getStoredAuth();
  }

  refreshAccessToken(auth) {
    return this.handleRequest(
      () => refreshAccessToken(auth),
      "Refresh token failed."
    );
  }
  login(email, password) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.post("/auth/login", {
        email,
        password,
      });
      const user = normalizeUser(data?.data?.user, {
        normalizeRole,
        roleIdByName: this.roleIdByName,
      });
      const token = data?.data?.accessToken || null;
      const auth = buildAuth(user, token);
      setAuthState(auth);
      return auth;
    }, "Login failed.");
  }

  register(firstName, lastName, email, password) {
    return this.handleRequest(async () => {
      await httpClient.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      return this.login(email, password);
    }, "Registration failed.");
  }

  logout() {
    return this.handleRequest(async () => {
      try {
        await httpClient.post("/auth/logout");
      } finally {
        forceLogout();
      }
      return true;
    }, "Logout failed.");
  }
}

export const authService = new AuthServiceClass();
