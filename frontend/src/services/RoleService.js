import { httpClient } from "./shared/httpClient";
import { normalizeUser, normalizeRole } from "./shared/normalize";
import { BaseService } from "./BaseService";

class RoleServiceClass extends BaseService {
  constructor() {
    super();
    this.roleIdByName = new Map();
  }

  updateUserRole(userId, role) {
    return this.handleRequest(async () => {
      const normalizedRole = normalizeRole(role);
      const roleId = this.roleIdByName.get(normalizedRole) || null;
      if (!roleId) {
        throw new Error("Role not available.");
      }
      const { data } = await httpClient.put(`/users/${userId}`, { roleId });
      return normalizeUser(data?.data?.user, {
        normalizeRole,
        roleIdByName: this.roleIdByName,
      });
    }, "Unable to update user role.");
  }

  setRoleIdByName(map) {
    this.roleIdByName = map;
  }
}

export const roleService = new RoleServiceClass();
