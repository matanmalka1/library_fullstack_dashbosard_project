import {
  buildValidationError,
  isValidName,
  isValidEmail,
  isValidPassword,
} from "./validatorUtils.js";

// Validate payload for user registration.
export const validateRegister = (req, _res, next) => {
  const { email, password, firstName, lastName } = req.body ?? {};
  const errors = [];

  if (!isValidEmail(email))
    errors.push({ field: "email", message: "Email must be a valid address" });

  if (!isValidName(firstName)) {
    errors.push({
      field: "firstName",
      message: "First name must be 2-15 letters with no spaces",
    });
  }

  if (!isValidName(lastName)) {
    errors.push({
      field: "lastName",
      message: "Last name must be 2-15 letters with no spaces",
    });
  }

  if (!isValidPassword(password)) {
    errors.push({
      field: "password",
      message:
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
    });
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};

// Validate payload for login.
export const validateLogin = (req, _res, next) => {
  // NOTE: Validation handled by the Mongoose model.
  const { email, password } = req.body ?? {};
  const errors = [];

  if (!isValidEmail(email))
    errors.push({ field: "email", message: "Email must be a valid address" });

  if (!isValidPassword(password))
    errors.push({
      field: "password",
      message:
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
    });

  return errors.length > 0 ? next(buildValidationError(errors)) : next();
};

// Validate payload for password change.
export const validateChangePassword = (req, _res, next) => {
  const { currentPassword, newPassword } = req.body ?? {};
  const errors = [];

  if (!isValidPassword(currentPassword)) {
    errors.push({
      field: "currentPassword",
      message:
        "Current password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
    });
  }

  if (!isValidPassword(newPassword)) {
    errors.push({
      field: "newPassword",
      message:
        "New password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
    });
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};

// Validate payload for profile updates.
export const validateUpdateProfile = (req, _res, next) => {
  const { firstName, lastName, phoneNumber, shippingAddress, bio } =
    req.body ?? {};
  const errors = [];

  if (firstName !== undefined && !isValidName(firstName)) {
    errors.push({
      field: "firstName",
      message: "First name must be 2-15 letters with no spaces",
    });
  }

  if (lastName !== undefined && !isValidName(lastName)) {
    errors.push({
      field: "lastName",
      message: "Last name must be 2-15 letters with no spaces",
    });
  }

  if (phoneNumber !== undefined && phoneNumber !== null) {
    const phoneRegex = /^[\d\s()+-]+$/;
    if (
      typeof phoneNumber !== "string" ||
      phoneNumber.length < 10 ||
      !phoneRegex.test(phoneNumber)
    ) {
      errors.push({
        field: "phoneNumber",
        message:
          "Phone number must be at least 10 characters and contain only digits, spaces, and +-() characters",
      });
    }
  }

  if (bio !== undefined && bio !== null) {
    if (typeof bio !== "string" || bio.length > 500) {
      errors.push({
        field: "bio",
        message: "Bio must be a string with maximum 500 characters",
      });
    }
  }

  if (shippingAddress !== undefined && shippingAddress !== null) {
    if (typeof shippingAddress !== "object") {
      errors.push({
        field: "shippingAddress",
        message: "Shipping address must be an object",
      });
    } else {
      const { street, city, state, zipCode, country } = shippingAddress;
      if (
        street !== undefined &&
        (typeof street !== "string" || street.trim().length < 3)
      ) {
        errors.push({
          field: "shippingAddress.street",
          message: "Street must be at least 3 characters",
        });
      }
      if (
        city !== undefined &&
        (typeof city !== "string" || city.trim().length < 2)
      ) {
        errors.push({
          field: "shippingAddress.city",
          message: "City must be at least 2 characters",
        });
      }
      if (
        state !== undefined &&
        (typeof state !== "string" || state.trim().length < 2)
      ) {
        errors.push({
          field: "shippingAddress.state",
          message: "State must be at least 2 characters",
        });
      }
      if (
        zipCode !== undefined &&
        (typeof zipCode !== "string" || zipCode.trim().length < 3)
      ) {
        errors.push({
          field: "shippingAddress.zipCode",
          message: "Zip code must be at least 3 characters",
        });
      }
      if (
        country !== undefined &&
        (typeof country !== "string" || country.trim().length < 2)
      ) {
        errors.push({
          field: "shippingAddress.country",
          message: "Country must be at least 2 characters",
        });
      }
    }
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};
