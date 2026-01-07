import { httpClient } from "./shared/httpClient";
import { normalizeReview } from "./shared/normalize";
import { BaseService } from "./BaseService";

class ReviewServiceClass extends BaseService {
  addReview(bookId, payload) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.post(
        `/books/${bookId}/reviews`,
        payload
      );
      return normalizeReview(data?.data?.review);
    }, "Unable to submit review.");
  }

  approveReview(bookId, reviewId) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.patch(
        `/books/${bookId}/reviews/${reviewId}/approve`
      );
      return normalizeReview(data?.data?.review);
    }, "Unable to approve review.");
  }

  deleteReview(bookId, reviewId) {
    return this.handleRequest(async () => {
      await httpClient.delete(`/books/${bookId}/reviews/${reviewId}`);
      return true;
    }, "Unable to delete review.");
  }
}

export const reviewService = new ReviewServiceClass();
