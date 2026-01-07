import { httpClient } from "./shared/httpClient";
import { normalizeReview } from "./shared/normalize";
import { BaseService } from "./BaseService";

class ReviewServiceClass extends BaseService {
  constructor() {
    super();
    this.httpClient = httpClient;
  }

  addReview(bookId, payload) {
    return this.handlePost(`/books/${bookId}/reviews`, payload, {
      normalize: (data) => normalizeReview(data?.review),
      fallback: "Unable to submit review.",
    });
  }

  approveReview(bookId, reviewId) {
    return this.handlePatch(
      `/books/${bookId}/reviews/${reviewId}/approve`,
      {},
      {
        normalize: (data) => normalizeReview(data?.review),
        fallback: "Unable to approve review.",
      }
    );
  }

  deleteReview(bookId, reviewId) {
    return this.handleDelete(`/books/${bookId}/reviews/${reviewId}`, {
      fallback: "Unable to delete review.",
    });
  }
}

export const reviewService = new ReviewServiceClass();
