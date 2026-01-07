import { normalizeUser, normalizeRole } from "./shared/normalize";
import { BaseService } from "./BaseService";

class RoleServiceClass extends BaseService {
  constructor() {
    super();
    this.roleIdByName = new Map();
  }

  updateUserRole(userId, role) {
    const normalizedRole = normalizeRole(role);
    const roleId = this.roleIdByName.get(normalizedRole) || null;
    if (!roleId) {
      return Promise.reject(new Error("Role not available."));
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

  setRoleIdByName(map) {
    this.roleIdByName = map;
  }
}

export const roleService = new RoleServiceClass();
