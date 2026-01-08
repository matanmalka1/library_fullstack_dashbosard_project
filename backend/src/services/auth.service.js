import { comparePassword, hashPassword } from "../utils/password.js";
import { logger } from "../utils/logger.js";
import { User, Role, RefreshToken } from "../models/index.js";
import {
  duplicateResourceError,
  invalidCredentialsError,
  authenticationError,
  refreshTokenInvalidError,
  resourceNotFoundError,
  serverError,
} from "../utils/error-factories.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import {
  hashRefreshToken,
  getRefreshTokenExpiration,
  sanitizeUser,
} from "../utils/auth-helpers.js";

// Create a new user account with the default role.
export const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    logger.warn("Registration failed - duplicate email", {
      email: userData.email,
    });
    throw duplicateResourceError("User", "email");
  }

  const defaultRole = await Role.findOne({ name: "user" });
  if (!defaultRole) {
    throw serverError("Default role not found");
  }

  const user = await User.create({
    email: userData.email,
    password: await hashPassword(userData.password),
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: defaultRole._id,
  });

  // Remove password from response
  const userObject = sanitizeUser(user);

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
    throw invalidCredentialsError();
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    logger.warn("Login failed - invalid password", { email });
    throw invalidCredentialsError();
  }

  const accessToken = generateAccessToken({ userId: user._id.toString() });
  const refreshToken = generateRefreshToken({ userId: user._id.toString() });

  const expiresAt = getRefreshTokenExpiration();

  // Store only a hashed representation of the refresh token to reduce
  // risk if the database is compromised.
  const tokenHash = hashRefreshToken(refreshToken);

  await RefreshToken.create({
    token: tokenHash,
    user: user._id,
    expiresAt,
  });

  await user.updateOne({ lastLogin: new Date() });

  // Remove password from response
  const userObject = sanitizeUser(user);

  logger.info("User logged in successfully", {
    userId: user._id,
    email: user.email,
  });

  return { user: userObject, accessToken, refreshToken };
};

// Revoke a refresh token to log out a user.
export const logout = async (userId, refreshToken) => {
  if (refreshToken) {
    const tokenHash = hashRefreshToken(refreshToken);

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
  const tokenHash = hashRefreshToken(oldRefreshToken);

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
    throw refreshTokenInvalidError("Invalid or already used/expired refresh token");
  }

  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) {
    throw authenticationError();
  }

  const newAccessToken = generateAccessToken({ userId: user._id.toString() });
  const newRefreshToken = generateRefreshToken({ userId: user._id.toString() });
  const expiresAt = getRefreshTokenExpiration();
  const newTokenHash = hashRefreshToken(newRefreshToken);

  await RefreshToken.create({
    token: newTokenHash,
    user: user._id,
    expiresAt,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

// Handle OAuth login - generate tokens and store refresh token.
export const handleOAuthLogin = async (user) => {
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
  });
  const refreshToken = generateRefreshToken({ userId: user._id.toString() });

  const tokenHash = hashRefreshToken(refreshToken);
  await RefreshToken.create({
    token: tokenHash,
    user: user._id,
    expiresAt: getRefreshTokenExpiration(),
  });

  logger.info("OAuth login successful", {
    userId: user._id,
    email: user.email,
  });

  return { accessToken, refreshToken };
};

// Change password for authenticated user.
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw resourceNotFoundError("User");
  }

  // Check if user authenticated via OAuth
  const hasOAuth = user.oauth?.google?.id || user.oauth?.github?.id;
  if (hasOAuth) {
    throw authenticationError("OAuth users cannot change password. Please use your social account login.");
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isPasswordValid) {
    throw invalidCredentialsError("Current password is incorrect");
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  logger.info("Password changed successfully", { userId });
};
