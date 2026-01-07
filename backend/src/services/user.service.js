import { User, Role } from "../models/index.js";
import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";
import { hashPassword } from "../utils/password.js";
import {parsePaginationParams,buildPaginationMeta,} from "../utils/pagination.js";

// CREATE
// Create a new user with role validation.
export const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new ApiError(
      API_ERROR_CODES.DUPLICATE_RESOURCE,
      "User with this email already exists",
      400
    );
  }

  const role = await Role.findById(userData.roleId);

  if (!role) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "Role not found",
      404
    );
  }

  const user = await User.create({
    email: userData.email,
    password: await hashPassword(userData.password),
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.roleId,
  });

  return user;
};

// READ ALL (with pagination)
// Fetch paginated users with role names.
export const getAllUsers = async (query) => {
  const { page, limit, skip } = parsePaginationParams(query, {
    defaultLimit: 10,
    maxLimit: 100,
  });

  const [users, count] = await Promise.all([
    User.find()
      .populate("role", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(),
  ]);

  return {
    users,
    ...buildPaginationMeta(page, limit, count),
  };
};

// READ ONE
// Fetch a single user by id with role and permissions.
export const getUserById = async (id) => {
  const user = await User.findById(id)
    .populate({
      path: "role",
      populate: { path: "permissions" },
    })
    .lean();

  if (!user) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      `User with id ${id} not found`,
      404
    );
  }

  return user;
};

// UPDATE
// Update user fields with email and role checks.
export const updateUser = async (id, userData) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
      404
    );
  }

  if (userData.email && userData.email !== user.email) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(
        API_ERROR_CODES.DUPLICATE_RESOURCE,
        "User with this email already exists",
        400
      );
    }
  }

  if (userData.roleId) {
    const role = await Role.findById(userData.roleId);
    if (!role) {
      throw new ApiError(
        API_ERROR_CODES.RESOURCE_NOT_FOUND,
        "Role not found",
        404
      );
    }
    userData.role = userData.roleId;
    delete userData.roleId;
  }

  if (userData.password) {
    userData.password = await hashPassword(userData.password);
  }

  Object.assign(user, userData);
  await user.save();

  return user;
};

// DELETE
// Delete a user by id.
export const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
      404
    );
  }

  await user.deleteOne();
};
