import { comparePassword, hashPassword } from "../utils/password.js";
import { logger } from "../utils/logger.js";
import { User, Role, RefreshToken } from "../models/index.js";
import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import crypto from "node:crypto";

// Create a new user account with the default role.
export const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    logger.warn("Registration failed - duplicate email", {
      email: userData.email,
    });
    throw new ApiError(
      API_ERROR_CODES.DUPLICATE_RESOURCE,
      "User with this email already exists",
      400
    );
  }

  const defaultRole = await Role.findOne({ name: "user" });
  if (!defaultRole) {
    throw new ApiError(
      API_ERROR_CODES.SERVER_ERROR,
      "Default role not found",
      500
    );
  }

  const user = await User.create({
    email: userData.email,
    password: await hashPassword(userData.password),
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: defaultRole._id,
  });

  // Remove password from response
  const userObject = user.toObject();
  delete userObject.password;

  logger.info("User registered successfully", {
    userId: user._id,
    email: user.email,
  });

  return { user: userObject };
};

// Authenticate a user and issue access/refresh tokens.
export const login = async (email, password) => {
  const user = await User.findOne({ email })
    .select("+password")
    .populate({
      path: "role",
      populate: { path: "permissions" },
    });

  if (!user || !user.isActive) {
    logger.warn("Login failed - invalid credentials", { email });
    throw new ApiError(
      API_ERROR_CODES.INVALID_CREDENTIALS,
      "Invalid credentials",
      401
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    logger.warn("Login failed - invalid password", { email });
    throw new ApiError(
      API_ERROR_CODES.INVALID_CREDENTIALS,
      "Invalid credentials",
      401
    );
  }

  const accessToken = generateAccessToken({ userId: user._id.toString() });
  const refreshToken = generateRefreshToken({ userId: user._id.toString() });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Store only a hashed representation of the refresh token to reduce
  // risk if the database is compromised.
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await RefreshToken.create({
    token: tokenHash,
    user: user._id,
    expiresAt,
  });

  await user.updateOne({ lastLogin: new Date() });

  // Remove password from response
  const userObject = user.toObject();
  delete userObject.password;

  logger.info("User logged in successfully", {
    userId: user._id,
    email: user.email,
  });

  return { user: userObject, accessToken, refreshToken };
};

// Revoke a refresh token to log out a user.
export const logout = async (userId, refreshToken) => {
  if (refreshToken) {
    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await RefreshToken.updateOne(
      { token: tokenHash, user: userId },
      { isRevoked: true, revokedAt: new Date() }
    );
    logger.info("User logged out", { userId });
  }
};

// Validate refresh token and rotate tokens.
export const refreshAccessToken = async (oldRefreshToken) => {
  const decoded = verifyRefreshToken(oldRefreshToken);

  // Use a hashed token lookup and atomically mark the token revoked to
  // prevent replay attacks/race conditions.
  const tokenHash = crypto
    .createHash("sha256")
    .update(oldRefreshToken)
    .digest("hex");

  const tokenRecord = await RefreshToken.findOneAndUpdate(
    {
      token: tokenHash,
      user: decoded.userId,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    },
    { isRevoked: true, revokedAt: new Date() }
  );

  if (!tokenRecord) {
    throw new ApiError(
      API_ERROR_CODES.REFRESH_TOKEN_INVALID,
      "Invalid or already used/expired refresh token",
      401
    );
  }

  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) {
    throw new ApiError(
      API_ERROR_CODES.AUTHENTICATION_ERROR,
      "User not found or inactive",
      401
    );
  }

  const newAccessToken = generateAccessToken({ userId: user._id.toString() });
  const newRefreshToken = generateRefreshToken({ userId: user._id.toString() });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const newTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  await RefreshToken.create({
    token: newTokenHash,
    user: user._id,
    expiresAt,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
