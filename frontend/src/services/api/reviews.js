import { setStore, KEYS } from "./core";
import { requireRole } from "./auth.utils";
import { UserRole } from "../../types";

const recalculateRating = (book) => {
  const approved = book.reviews.filter((r) => r.approved);
  book.rating = approved.length
    ? Number(
        (
          approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
        ).toFixed(1)
      )
    : 0;
};

export const attachReviewMethods = (service) => {
  service.addReview = async (bookId, review) => {
    const books = await service.getBooks();
    const book = books.find((b) => b.id === bookId);

    if (book) {
      book.reviews.push({
        ...review,
        id: Date.now().toString(),
        approved: false,
      });
    }

    setStore(KEYS.BOOKS, books);
  };

  service.approveReview = async (bookId, reviewId) => {
    requireRole([UserRole.ADMIN]);
    const books = await service.getBooks();
    const book = books.find((b) => b.id === bookId);
    const review = book?.reviews.find((r) => r.id === reviewId);

    if (book && review) {
      review.approved = true;
      recalculateRating(book);
    }

    setStore(KEYS.BOOKS, books);
  };

  service.deleteReview = async (bookId, reviewId) => {
    requireRole([UserRole.ADMIN]);
    const books = await service.getBooks();
    const book = books.find((b) => b.id === bookId);

    if (book) {
      book.reviews = book.reviews.filter((r) => r.id !== reviewId);
      recalculateRating(book);
    }

    setStore(KEYS.BOOKS, books);
  };
};
