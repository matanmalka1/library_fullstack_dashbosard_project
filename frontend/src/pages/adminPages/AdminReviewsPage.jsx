import { useEffect, useMemo, useState } from "react";
import { bookService } from "../../services/BookService";
import { reviewService } from "../../services/ReviewService";
import { AdminReviewsPanel } from "./AdminReviewsPanel";
import { AdminLayout } from "./AdminLayout";

export const AdminReviewsPage = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setError("");
    try {
      const books = await bookService.getBooks({ includePendingReviews: true });
      const pending = [];
      books.forEach((book) => {
        book.reviews.forEach((review) => {
          if (!review.approved) {
            pending.push({ bookId: book.id, bookTitle: book.title, review });
          }
        });
      });
      setPendingReviews(pending);
      setSelectedIds(new Set());
    } catch (err) {
      setError(err.message || "Unable to load pending reviews.");
    }
  };

  const handleApprove = async (bookId, reviewId) => {
    try {
      await reviewService.approveReview(bookId, reviewId);
      fetchReviews();
    } catch (err) {
      setError(err.message || "Unable to approve review.");
    }
  };

  const handleDelete = async (bookId, reviewId) => {
    if (!confirm("Delete this review permanently?")) return;
    try {
      await reviewService.deleteReview(bookId, reviewId);
      fetchReviews();
    } catch (err) {
      setError(err.message || "Unable to delete review.");
    }
  };

  const selectedEntries = useMemo(() => {
    if (!selectedIds.size) return [];
    return pendingReviews.filter((entry) =>
      selectedIds.has(entry.review.id)
    );
  }, [pendingReviews, selectedIds]);

  const handleToggleSelect = (reviewId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    if (selectedIds.size === pendingReviews.length) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(pendingReviews.map((entry) => entry.review.id)));
  };

  const handleBulkApprove = async () => {
    if (!selectedEntries.length) return;
    try {
      await Promise.all(
        selectedEntries.map((entry) =>
          reviewService.approveReview(entry.bookId, entry.review.id)
        )
      );
      fetchReviews();
    } catch (err) {
      setError(err.message || "Unable to approve selected reviews.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedEntries.length) return;
    if (!confirm("Delete selected reviews permanently?")) return;
    try {
      await Promise.all(
        selectedEntries.map((entry) =>
          reviewService.deleteReview(entry.bookId, entry.review.id)
        )
      );
      fetchReviews();
    } catch (err) {
      setError(err.message || "Unable to delete selected reviews.");
    }
  };

  return (
    <AdminLayout activeTab="reviews" error={error}>
      <AdminReviewsPanel
        pendingReviews={pendingReviews}
        onApprove={handleApprove}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleAll={handleToggleAll}
        onBulkApprove={handleBulkApprove}
        onBulkDelete={handleBulkDelete}
      />
    </AdminLayout>
  );
};
