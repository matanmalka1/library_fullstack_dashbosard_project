import  { useState } from "react";
import { reviewService } from "../../../services/ReviewService";
import { useAuth } from "../../../context/auth/AuthContext";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";

export const ReviewSection = ({ book, onUpdate }) => {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const approved = book.reviews.filter((r) => r.approved);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !comment) return;
    await reviewService.addReview(book.id, {
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString(),
    });
    setComment("");
    alert("Review submitted for approval!");
    onUpdate();
  };

  return (
    <div className="flex flex-col gap-16 md:flex-row">
      <ReviewSummary
        ratingValue={book.rating || 0}
        reviewCount={approved.length}
        isAuthenticated={isAuthenticated}
        rating={rating}
        comment={comment}
        onPickRating={setRating}
        onCommentChange={setComment}
        onSubmit={handleSubmit}
      />
      <ReviewList reviews={approved} />
    </div>
  );
};
