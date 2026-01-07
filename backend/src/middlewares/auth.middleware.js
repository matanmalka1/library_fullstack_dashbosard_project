import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";
import { User } from "../models/index.js";
import { logger } from "../utils/logger.js";

// Authenticate request by validating JWT and loading user with role/permissions.
export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        API_ERROR_CODES.AUTHENTICATION_ERROR,
        "No token provided",
        401
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.userId)
      .populate({
        path: "role",
        populate: { path: "permissions" },
      })
      .lean();

    if (!user || !user.isActive) {
      // Helpful debug log for tracing token -> DB user mapping issues
      try {
        logger.warn("Auth failed - token valid but user missing or inactive", {
          tokenUserId: decoded?.userId,
          tokenPayload: decoded,
        });
      } catch (logErr) {
        // swallow logging errors to avoid breaking auth flow
      }

      throw new ApiError(
        API_ERROR_CODES.AUTHENTICATION_ERROR,
        "User not found or inactive",
        401
      );
    }

    req.user = user;
    if (req.user && !req.user.id && req.user._id) {
      req.user.id = req.user._id.toString();
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Check authenticated user's role against allowed roles.
export const authorize = (...roles) => {
  return async (req, _res, next) => {
    try {
      if (!req.user) {
        throw new ApiError(
          API_ERROR_CODES.AUTHORIZATION_ERROR,
          "User not authenticated",
          403
        );
      }

      const userRole = req.user.role.name;

      if (!roles.includes(userRole)) {
        throw new ApiError(
          API_ERROR_CODES.AUTHORIZATION_ERROR,
          "Insufficient permissions",
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Check authenticated user's permissions for a resource/action pair.
export const checkPermission = (resource, action) => {
  return async (req, _res, next) => {
    try {
      if (!req.user || !req.user.role) {
        throw new ApiError(
          API_ERROR_CODES.AUTHORIZATION_ERROR,
          "User not authenticated",
          403
        );
      }

      const hasPermission = req.user.role.permissions.some(
        (permission) =>
          permission.resource === resource && permission.action === action
      );

      if (!hasPermission) {
        throw new ApiError(
          API_ERROR_CODES.AUTHORIZATION_ERROR,
          `Permission denied: ${action} on ${resource}`,
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
