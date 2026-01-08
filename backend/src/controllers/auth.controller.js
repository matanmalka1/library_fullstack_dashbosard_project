import {
  register as registerUser,
  login as loginUser,
} from "../services/auth/core.service.js";
import {
  logout as logoutUser,
  refreshAccessToken,
} from "../services/auth/token.service.js";
import { changePassword as changeUserPassword } from "../services/auth/password.service.js";
import { updateProfile as updateUserProfile } from "../services/auth/profile.service.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { refreshTokenInvalidError } from "../utils/error-factories.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE
    ? process.env.COOKIE_SECURE === "true"
    : process.env.NODE_ENV === "production",
  sameSite: process.env.COOKIE_SAME_SITE || "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

// Handle registration request.
export const register = asyncHandler(async (req, res) => {
  const { user } = await registerUser(req.body);
  successResponse(res, { user }, "User registered successfully", 201);
});

// Handle login request and set refresh token cookie.
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(
    email,
    password
  );

  res.cookie("refreshToken", refreshToken, cookieOptions);
  successResponse(res, { user, accessToken }, "Login successful");
});

// Handle logout request and clear refresh token cookie.
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  await logoutUser(req.user.id, refreshToken);

  res.clearCookie("refreshToken", cookieOptions);
  successResponse(res, null, "Logout successful");
});

// Handle access token refresh request.
export const refresh = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;

  if (!oldRefreshToken) {
    throw refreshTokenInvalidError("Refresh token not found");
  }
  const { accessToken, refreshToken } = await refreshAccessToken(
    oldRefreshToken
  );

  res.cookie("refreshToken", refreshToken, cookieOptions);
  successResponse(res, { accessToken }, "Token refreshed successfully");
});

// Return the authenticated user's profile.
export const me = asyncHandler(async (req, res) => {
  successResponse(
    res,
    { user: req.user },
    "User profile retrieved successfully"
  );
});

// Handle password change request.
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await changeUserPassword(req.user.id, currentPassword, newPassword);
  successResponse(res, null, "Password changed successfully");
});

// Handle profile update request.
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await updateUserProfile(req.user.id, req.body);
  successResponse(res, { user }, "Profile updated successfully");
});
