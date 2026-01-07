import { Book, Review } from "../models/index.js";
import { resourceNotFoundError } from "../utils/error-factories.js";

const recalculateRating = async (bookId) => {
  const approved = await Review.find({ book: bookId, approved: true }).lean();
  const rating = approved.length
    ? Number(
        (
          approved.reduce((sum, review) => sum + review.rating, 0) /
          approved.length
        ).toFixed(1)
      )
    : 0;
  await Book.updateOne({ _id: bookId }, { rating });
};

export const addReview = async (bookId, user, data) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw resourceNotFoundError("Book");
  }

  const review = await Review.create({
    book: book._id,
    user: user._id,
    userName: `${user.firstName} ${user.lastName}`.trim(),
    rating: data.rating,
    comment: data.comment,
    approved: false,
    date: data.date ? new Date(data.date) : new Date(),
  });

  book.reviews.push(review._id);
  await book.save();

  return review;
};

export const approveReview = async (bookId, reviewId) => {
  const review = await Review.findOne({ _id: reviewId, book: bookId });
  if (!review) {
    throw resourceNotFoundError("Review");
  }

  if (!review.approved) {
    review.approved = true;
    await review.save();
    await recalculateRating(bookId);
  }

  return review;
};

export const deleteReview = async (bookId, reviewId) => {
  const review = await Review.findOne({ _id: reviewId, book: bookId });
  if (!review) {
    throw resourceNotFoundError("Review");
  }

  const wasApproved = review.approved;

  await Review.deleteOne({ _id: reviewId });
  await Book.updateOne({ _id: bookId }, { $pull: { reviews: reviewId } });

  if (wasApproved) {
    await recalculateRating(bookId);
  }
};
