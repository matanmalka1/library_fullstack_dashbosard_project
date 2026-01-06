import mongoose from "mongoose";
import { buildValidationError } from "./validatorUtils.js";

export const validateToggleWishlist = (req, _res, next) => {
  const { bookId } = req.body ?? {};
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return next(
      buildValidationError([
        { field: "bookId", message: "Invalid book ID format" },
      ])
    );
  }
  return next();
};
