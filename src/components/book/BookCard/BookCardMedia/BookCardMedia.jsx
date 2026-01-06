import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import "./BookCardMedia.css";

export const BookCardMedia = ({
  id,
  safeTitle,
  safeAuthor,
  coverImage,
  isWishlisted,
  onToggleWishlist,
  isOutOfStock,
}) => {
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist?.(id);
  };

  return (
    <div className="book-card__media">
      <Link to={`/books/${id}`} aria-label={`View details for ${safeTitle}`}>
        <img
          src={coverImage}
          alt={`Cover of ${safeTitle} by ${safeAuthor}`}
          className="book-card__image"
          loading="lazy"
        />
      </Link>

      <div className="book-card__wishlist">
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`book-card__wishlist-btn ${isWishlisted ? "is-active" : ""}`}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart className="book-card__wishlist-icon" />
        </button>
      </div>

      {isOutOfStock && (
        <div className="book-card__overlay" aria-hidden="true">
          <span className="book-card__overlay-text">Out of Stock</span>
        </div>
      )}
    </div>
  );
};
