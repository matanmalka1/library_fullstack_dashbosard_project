import * as reviewService from "../services/review.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// CREATE
// Submit a review for a book.
export const addReview = asyncHandler(async (req, res) => {
  const review = await reviewService.addReview(
    req.params.id,
    req.user,
    req.body
  );
  successResponse(res, { review }, "Review submitted successfully", 201);
});

// UPDATE
// Approve a pending review.
export const approveReview = asyncHandler(async (req, res) => {
  const review = await reviewService.approveReview(
    req.params.id,
    req.params.reviewId
  );
  successResponse(res, { review }, "Review approved successfully");
});

// DELETE
// Delete a review.
export const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(req.params.id, req.params.reviewId);
  successResponse(res, null, "Review deleted successfully");
});

// READ ALL
// READ ONE
