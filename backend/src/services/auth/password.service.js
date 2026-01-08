import { comparePassword, hashPassword } from "../../utils/password.js";
import { logger } from "../../utils/logger.js";
import { User } from "../../models/index.js";
import {
  authenticationError,
  invalidCredentialsError,
  resourceNotFoundError,
} from "../../utils/error-factories.js";

// Change password for authenticated user.
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw resourceNotFoundError("User");
  }

  // Check if user authenticated via OAuth
  const hasOAuth = user.oauth?.google?.id || user.oauth?.github?.id;
  if (hasOAuth) {
    throw authenticationError(
      "OAuth users cannot change password. Please use your social account login."
    );
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isPasswordValid) {
    throw invalidCredentialsError("Current password is incorrect");
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  logger.info("Password changed successfully", { userId });
};
