import React from "react";
import { Star } from "lucide-react";
import "./ReviewSummary.css";

export const ReviewSummary = ({
  ratingValue,
  reviewCount,
  isAuthenticated,
  rating,
  comment,
  onPickRating,
  onCommentChange,
  onSubmit,
}) => (
  <div className="review-section__summary">
    <h2 className="review-section__title">Insights</h2>
    <div className="review-section__card">
      <div className="review-section__rating">
        <span className="review-section__rating-value">{ratingValue}</span>
        <div className="review-section__rating-stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`review-section__star ${
                i <= ratingValue ? "is-active" : ""
              }`}
            />
          ))}
        </div>
        <span className="review-section__rating-count">
          {reviewCount} reviews
        </span>
      </div>
      {isAuthenticated ? (
        <form onSubmit={onSubmit} className="review-section__form">
          <div className="review-section__picker">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => onPickRating(i)}
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
            onChange={(e) => onCommentChange(e.target.value)}
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
);
