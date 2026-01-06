import { requireRole } from "./auth.utils";
import { UserRole } from "../../types";
import { http } from "./http";

const getApiErrorMessage = (error, fallback) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return error?.message || fallback;
};

export const attachReviewMethods = (service) => {
  service.addReview = async (bookId, review) => {
    try {
      await http.post(`/books/${bookId}/reviews`, {
        rating: review.rating,
        comment: review.comment,
      });
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to submit review"));
    }
  };

  service.approveReview = async (bookId, reviewId) => {
    requireRole([UserRole.ADMIN]);
    try {
      await http.patch(`/books/${bookId}/reviews/${reviewId}/approve`);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to approve review"));
    }
  };

  service.deleteReview = async (bookId, reviewId) => {
    requireRole([UserRole.ADMIN]);
    try {
      await http.delete(`/books/${bookId}/reviews/${reviewId}`);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to delete review"));
    }
  };
};
