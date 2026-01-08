import { useEffect, useState } from "react";
import { bookService } from "../../services/BookService";
import { usersService } from "../../services/UsersService";
import { AdminReviewsPanel } from "./AdminReviewsPanel";
import { AdminLayout } from "./AdminLayout";

export const AdminReviewsPage = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setError("");
    try {
      const books = await bookService.getBooks();
      const pending = [];
      books.forEach((book) => {
        book.reviews.forEach((review) => {
          if (!review.approved) {
            pending.push({ bookId: book.id, bookTitle: book.title, review });
          }
        });
      });
      setPendingReviews(pending);
    } catch (err) {
      setError(err.message || "Unable to load pending reviews.");
    }
  };

  const handleApprove = async (bookId, reviewId) => {
    try {
      await usersService.approveReview(bookId, reviewId);
      fetchReviews();
    } catch (err) {
      setError(err.message || "Unable to approve review.");
    }
  };

  const handleDelete = async (bookId, reviewId) => {
    if (!confirm("Delete this review permanently?")) return;
    try {
      await usersService.deleteReview(bookId, reviewId);
      fetchReviews();
    } catch (err) {
      setError(err.message || "Unable to delete review.");
    }
  };

  return (
    <AdminLayout activeTab="reviews" error={error}>
      <AdminReviewsPanel
        pendingReviews={pendingReviews}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
};
