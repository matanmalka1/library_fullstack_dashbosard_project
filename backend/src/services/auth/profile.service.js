import { logger } from "../../utils/logger.js";
import { User } from "../../models/index.js";
import { resourceNotFoundError } from "../../utils/error-factories.js";
import { sanitizeUser } from "../../utils/auth-helpers.js";

// Update authenticated user's profile.
export const updateProfile = async (userId, profileData) => {
  const user = await User.findById(userId).populate({
    path: "role",
    populate: { path: "permissions" },
  });

  if (!user) {
    throw resourceNotFoundError("User");
  }

  // Only allow updating specific profile fields (not role, email, password, etc.)
  const allowedFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "bio",
    "profilePicture",
  ];
  const updates = {};

  for (const field of allowedFields) {
    if (profileData[field] !== undefined) {
      updates[field] = profileData[field];
    }
  }

  // Handle shippingAddress specially - map to defaultShippingAddress
  if (profileData.shippingAddress !== undefined) {
    updates.defaultShippingAddress = profileData.shippingAddress;
  }

  Object.assign(user, updates);
  await user.save();

  const userObject = sanitizeUser(user);

  logger.info("Profile updated successfully", { userId });

  return userObject;
};
