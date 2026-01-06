import React from "react";
import { Star, CheckCircle2, XCircle } from "lucide-react";
import "./AdminReviewsPanel.css";

export const AdminReviewsPanel = ({ pendingReviews, onApprove, onDelete }) => (
  <div className="admin-dashboard__reviews">
    <div className="admin-dashboard__section-header">
      <h2 className="admin-dashboard__section-title">Review Moderation</h2>
      <span className="admin-dashboard__badge">
        {pendingReviews.length} Pending
      </span>
    </div>

    {pendingReviews.length > 0 ? (
      <div className="admin-dashboard__review-list">
        {pendingReviews.map(({ bookId, bookTitle, review }) => (
          <div key={review.id} className="admin-dashboard__review-card">
            <div className="admin-dashboard__review-header">
              <div className="admin-dashboard__review-user">
                <div className="admin-dashboard__review-avatar">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="admin-dashboard__review-title">
                    {review.userName} <span>on</span>{" "}
                    <span className="admin-dashboard__review-book">
                      {bookTitle}
                    </span>
                  </h4>
                  <div className="admin-dashboard__review-stars">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`admin-dashboard__star ${
                          i <= review.rating ? "is-active" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-dashboard__review-actions">
                <button
                  onClick={() => onApprove(bookId, review.id)}
                  className="admin-dashboard__review-action admin-dashboard__review-action--approve"
                >
                  <CheckCircle2 className="admin-dashboard__review-action-icon" />
                </button>
                <button
                  onClick={() => onDelete(bookId, review.id)}
                  className="admin-dashboard__review-action admin-dashboard__review-action--delete"
                >
                  <XCircle className="admin-dashboard__review-action-icon" />
                </button>
              </div>
            </div>
            <p className="admin-dashboard__review-text">"{review.comment}"</p>
            <p className="admin-dashboard__review-date">
              {new Date(review.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <div className="admin-dashboard__empty">
        <CheckCircle2 className="admin-dashboard__empty-icon" />
        <h3 className="admin-dashboard__empty-text">
          Queue is empty. Great job!
        </h3>
      </div>
    )}
  </div>
);
