import mongoose from "mongoose";
import {
  buildValidationError,
  isNonEmptyString,
  isPositiveNumber,
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

export const validateCreateBook = (req, _res, next) => {
  const { title, author, price } = req.body ?? {};
  const errors = [];

  if (!isNonEmptyString(title)) {
    errors.push({ field: "title", message: "Title is required" });
  }

  if (!isNonEmptyString(author)) {
    errors.push({ field: "author", message: "Author is required" });
  }

  if (!isPositiveNumber(price)) {
    errors.push({ field: "price", message: "Price must be a number >= 0" });
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};

export const validateUpdateBook = (req, _res, next) => {
  const { title, author, price, stockQuantity, categories } = req.body ?? {};
  const errors = [];

  if (title !== undefined && !isNonEmptyString(title)) {
    errors.push({ field: "title", message: "Title must be a non-empty string" });
  }

  if (author !== undefined && !isNonEmptyString(author)) {
    errors.push({
      field: "author",
      message: "Author must be a non-empty string",
    });
  }

  if (price !== undefined && !isPositiveNumber(price)) {
    errors.push({ field: "price", message: "Price must be a number >= 0" });
  }

  if (
    stockQuantity !== undefined &&
    (!Number.isFinite(stockQuantity) || stockQuantity < 0)
  ) {
    errors.push({
      field: "stockQuantity",
      message: "stockQuantity must be a number >= 0",
    });
  }

  if (categories !== undefined && !Array.isArray(categories)) {
    errors.push({
      field: "categories",
      message: "categories must be an array",
    });
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};
