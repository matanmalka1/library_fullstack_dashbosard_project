import express from "express";
import {
  addReview,
  approveReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import {
  validateBookIdParam,
  validateReviewIdParam,
  validateCreateReview,
} from "../validators/reviewValidate.js";

export const router = express.Router();

router.post(
  "/books/:id/reviews",
  authenticate,
  validateBookIdParam,
  validateCreateReview,
  addReview
);
router.patch(
  "/books/:id/reviews/:reviewId/approve",
  authenticate,
  authorize("admin"),
  validateBookIdParam,
  validateReviewIdParam,
  approveReview
);
router.delete(
  "/books/:id/reviews/:reviewId",
  authenticate,
  authorize("admin"),
  validateBookIdParam,
  validateReviewIdParam,
  deleteReview
);
