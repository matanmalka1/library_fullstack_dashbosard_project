import React from "react";
import { Star, MessageCircle } from "lucide-react";
import "./ReviewList.css";

export const ReviewList = ({ reviews }) => (
  <div className="review-section__list">
    {reviews.length ? (
      reviews.map((review) => (
        <div key={review.id} className="review-section__review">
          <div className="review-section__review-header">
            <div className="review-section__review-user">
              <div className="review-section__review-avatar">
                {review.userName[0]}
              </div>
              <div>
                <h4 className="review-section__review-name">
                  {review.userName}
                </h4>
                <div className="review-section__review-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`review-section__review-star ${
                        i <= review.rating ? "is-active" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="review-section__review-date">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          <p className="review-section__review-text">"{review.comment}"</p>
        </div>
      ))
    ) : (
      <div className="review-section__empty">
        <MessageCircle className="review-section__empty-icon" />
        <p className="review-section__empty-text">No verified reviews yet.</p>
      </div>
    )}
  </div>
);
