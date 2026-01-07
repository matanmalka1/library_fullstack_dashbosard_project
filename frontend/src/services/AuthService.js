import { httpClient } from "./shared/httpClient";
import { normalizeUser, normalizeRole } from "./shared/normalize";
import { buildAuth, getStoredAuth } from "./auth/authUtils";
import { setAuthState } from "./auth/authStore";
import { forceLogout, refreshAccessToken } from "./auth/authSession";
import { BaseService } from "./BaseService";

class AuthServiceClass extends BaseService {
  constructor() {
    super();
    this.httpClient = httpClient;
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
    return this.handlePost(
      "/auth/login",
      { email, password },
      {
        normalize: (data) => {
          const user = normalizeUser(data?.user, {
            normalizeRole,
            roleIdByName: this.roleIdByName,
          });
          const token = data?.accessToken || null;
          const auth = buildAuth(user, token);
          setAuthState(auth);
          return auth;
        },
        fallback: "Login failed.",
      }
    );
  }

  async register(firstName, lastName, email, password) {
    await this.handlePost(
      "/auth/register",
      {
        firstName,
        lastName,
        email,
        password,
      },
      { fallback: "Registration failed." }
    );
    // After successful registration, auto-login
    return this.login(email, password);
  }

  logout() {
    return this.handlePost(
      "/auth/logout",
      {},
      {
        normalize: () => {
          forceLogout();
          return true;
        },
        fallback: "Logout failed.",
      }
    );
  }
}

export const authService = new AuthServiceClass();
