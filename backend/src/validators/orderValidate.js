import mongoose from "mongoose";
import {
  buildValidationError,
  isNonEmptyString,
  isPositiveInteger,
} from "./validatorUtils.js";

const ORDER_STATUSES = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

export const validateOrderIdParam = (req, _res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      buildValidationError([{ field: "id", message: "Invalid order ID format" }])
    );
  }
  return next();
};

export const validateCreateOrder = (req, _res, next) => {
  const { items, shippingAddress } = req.body ?? {};
  const errors = [];

  if (!Array.isArray(items) || items.length === 0) {
    errors.push({ field: "items", message: "items must be a non-empty array" });
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

  if (!isNonEmptyString(shippingAddress)) {
    errors.push({
      field: "shippingAddress",
      message: "shippingAddress is required",
    });
  }

  return errors.length ? next(buildValidationError(errors)) : next();
};

export const validateOrderStatus = (req, _res, next) => {
  const { status } = req.body ?? {};
  if (!ORDER_STATUSES.includes(status)) {
    return next(
      buildValidationError([
        { field: "status", message: "Invalid order status" },
      ])
    );
  }
  return next();
};
