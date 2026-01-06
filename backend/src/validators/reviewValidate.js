import mongoose from "mongoose";
import {
  buildValidationError,
  isNonEmptyString,
  isValidRating,
} from "./validatorUtils.js";

export const validateBookIdParam = (req, _res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      buildValidationError([{ field: "id", message: "Invalid book ID format" }])
    );
  }
  return next();
};

export const validateReviewIdParam = (req, _res, next) => {
  const { reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return next(
      buildValidationError([
        { field: "reviewId", message: "Invalid review ID format" },
      ])
    );
  }
  return next();
};

export const validateCreateReview = (req, _res, next) => {
  const { rating, comment } = req.body ?? {};
  const errors = [];

  if (!isValidRating(rating)) {
    errors.push({ field: "rating", message: "Rating must be between 1 and 5" });
  }

  if (!isNonEmptyString(comment)) {
    errors.push({ field: "comment", message: "Comment is required" });
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};
