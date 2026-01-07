import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";
import { logger } from "../utils/logger.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getUserFromToken } from "../utils/auth-helpers.js";
import { authenticationError,authorizationError } from "../utils/error-factories.js";

// Authenticate request by validating JWT and loading user with role/permissions.
export const authenticate = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw authenticationError("No token provided");
  }

  const user = await getUserFromToken(authHeader, { includePermissions: true });

  if (!user) {
    try {
      logger.warn("Auth failed - token valid but user missing or inactive");
    } catch (logErr) {}

    throw authenticationError();
  }

  req.user = user;
  if (req.user && !req.user.id && req.user._id) {
    req.user.id = req.user._id.toString();
  }
  next();
});

// Check authenticated user's role against allowed roles.
export const authorize = (...roles) => {
  return asyncHandler(async (req, _res, next) => {
    if (!req.user) {
      throw authorizationError("User not authenticated");
    }

    const userRole = req.user.role.name;

    if (!roles.includes(userRole)) {
      throw authorizationError();
    }

    next();
  });
};

// Check authenticated user's permissions for a resource/action pair.
export const checkPermission = (resource, action) => {
  return asyncHandler(async (req, _res, next) => {
    if (!req.user || !req.user.role) {
      throw authorizationError("User not authenticated");
    }

    const hasPermission = req.user.role.permissions.some(
      (permission) =>
        permission.resource === resource && permission.action === action
    );

    if (!hasPermission) {
      throw authorizationError(`Permission denied: ${action} on ${resource}`);
    }

    next();
  });
};
