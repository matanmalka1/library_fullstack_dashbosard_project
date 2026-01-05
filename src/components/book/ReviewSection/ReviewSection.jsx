import React, { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import { api } from "../../../services/api";
import { useAuth } from "../../../context/auth/AuthContext";
import "./ReviewSection.css";

export const ReviewSection = ({ book, onUpdate }) => {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const approved = book.reviews.filter((r) => r.approved);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !comment) return;
    await api.addReview(book.id, {
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
    <div className="review-section">
      <div className="review-section__summary">
        <h2 className="review-section__title">Insights</h2>
        <div className="review-section__card">
          <div className="review-section__rating">
            <span className="review-section__rating-value">
              {book.rating || 0}
            </span>
            <div className="review-section__rating-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`review-section__star ${
                    i <= (book.rating || 0) ? "is-active" : ""
                  }`}
                />
              ))}
            </div>
            <span className="review-section__rating-count">
              {approved.length} reviews
            </span>
          </div>
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className="review-section__form">
              <div className="review-section__picker">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    className="review-section__picker-btn"
                  >
                    <Star
                      className={`review-section__picker-star ${
                        i <= rating ? "is-active" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="review-section__textarea"
                placeholder="Your thoughts..."
              />
              <button className="review-section__submit">Submit Review</button>
            </form>
          ) : (
            <p className="review-section__signin">Sign in to leave a review.</p>
          )}
        </div>
      </div>
      <div className="review-section__list">
        {approved.length ? (
          approved.map((r) => (
            <div key={r.id} className="review-section__review">
              <div className="review-section__review-header">
                <div className="review-section__review-user">
                  <div className="review-section__review-avatar">
                    {r.userName[0]}
                  </div>
                  <div>
                    <h4 className="review-section__review-name">
                      {r.userName}
                    </h4>
                    <div className="review-section__review-stars">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`review-section__review-star ${
                            i <= r.rating ? "is-active" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="review-section__review-date">
                  {new Date(r.date).toLocaleDateString()}
                </span>
              </div>
              <p className="review-section__review-text">"{r.comment}"</p>
            </div>
          ))
        ) : (
          <div className="review-section__empty">
            <MessageCircle className="review-section__empty-icon" />
            <p className="review-section__empty-text">
              No verified reviews yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
