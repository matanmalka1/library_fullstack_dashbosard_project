import { httpClient } from "./shared/httpClient";
import { normalizeUser } from "./shared/normalize";
import { BaseService } from "./BaseService";

class UsersServiceClass extends BaseService {
  getUsers() {
    return this.handleRequest(async () => {
      const { data } = await httpClient.get("/users");
      const users = data?.data?.users || [];
      return users.map((user) => normalizeUser(user));
    }, "Unable to load users.");
  }

  createUser(payload) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.post("/users", payload);
      return normalizeUser(data?.data?.user, {
        normalizeRole,
        roleIdByName: this.roleIdByName,
      });
    }, "Unable to create user.");
  }

  getUserById(userId) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.get(`/users/${userId}`);
      return normalizeUser(data?.data?.user, {
        normalizeRole,
        roleIdByName: this.roleIdByName,
      });
    }, "Unable to load user.");
  }

  deleteUser(userId) {
    return this.handleRequest(async () => {
      await httpClient.delete(`/users/${userId}`);
      return true;
    }, "Unable to delete user.");
  }
}

export const usersService = new UsersServiceClass();
