import { normalizeUser, normalizeRole } from "./shared/normalize";
import { BaseService } from "./BaseService";

class UsersServiceClass extends BaseService {
  constructor() {
    super();
    this.roleIdByName = new Map();
  }

  getUsers() {
    return this.handleGetList("/users", {
      dataKey: "users",
      normalize: (user) =>
        normalizeUser(user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to load users.",
    });
  }

  createUser(payload) {
    return this.handlePost("/users", payload, {
      normalize: (data) =>
        normalizeUser(data?.user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to create user.",
    });
  }

  getUserById(userId) {
    return this.handleGet(`/users/${userId}`, {
      normalize: (data) =>
        normalizeUser(data?.user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to load user.",
    });
  }

  deleteUser(userId) {
    return this.handleDelete(`/users/${userId}`, {
      fallback: "Unable to delete user.",
    });
  }

  updateProfile(userId, payload) {
    return this.handlePut(`/users/${userId}`, payload, {
      normalize: (data) =>
        normalizeUser(data?.user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to update profile.",
    });
  }

  updateUserRole(userId, roleName) {
    const roleId = this.roleIdByName.get(roleName);
    if (!roleId) {
      return Promise.reject(new Error("Role mapping not found."));
    }
    return this.handlePut(
      `/users/${userId}`,
      { roleId },
      {
        normalize: (data) =>
          normalizeUser(data?.user, {
            normalizeRole,
            roleIdByName: this.roleIdByName,
          }),
        fallback: "Unable to update user role.",
      }
    );
  }
}

export const usersService = new UsersServiceClass();
