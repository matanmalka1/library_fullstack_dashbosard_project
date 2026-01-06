import mongoose from "mongoose";
import { buildValidationError, isPositiveInteger } from "./validatorUtils.js";

export const validateCartPayload = (req, _res, next) => {
  const { items } = req.body ?? {};
  const errors = [];

  if (!Array.isArray(items)) {
    errors.push({ field: "items", message: "items must be an array" });
  } else {
    items.forEach((item, index) => {
      const bookId = item?.bookId;
      const quantity = item?.quantity;
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        errors.push({
          field: `items[${index}].bookId`,
          message: "Invalid book ID format",
        });
      }
      if (!isPositiveInteger(quantity)) {
        errors.push({
          field: `items[${index}].quantity`,
          message: "quantity must be a positive integer",
        });
      }
    });
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};
