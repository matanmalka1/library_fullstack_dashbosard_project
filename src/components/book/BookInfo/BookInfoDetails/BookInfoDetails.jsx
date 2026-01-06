import React from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import "./BookInfoDetails.css";

export const BookInfoDetails = ({
  safeTitle,
  safeAuthor,
  displayRating,
  displayPrice,
  safeDescription,
  hasBook,
  onAddToCart,
}) => (
  <div className="book-info__details">
    <header className="book-info__header">
      <div className="book-info__rating" aria-label={`Rating: ${displayRating}`}>
        <Star
          className="book-info__star"
          size={18}
          fill="currentColor"
          aria-hidden="true"
        />
        <span className="book-info__rating-value">{displayRating}</span>
        <span className="book-info__rating-dot" aria-hidden="true">
          •
        </span>
        <span className="book-info__rating-text">Verified Selection</span>
      </div>

      <h1 className="book-info__title">{safeTitle}</h1>

      <p className="book-info__author">
        by <span className="book-info__author-name">{safeAuthor}</span>
      </p>
    </header>

    <p className="book-info__price">{displayPrice}</p>

    {safeDescription && (
      <blockquote className="book-info__description">
        {safeDescription}
      </blockquote>
    )}

    <div className="book-info__actions">
      <button
        onClick={onAddToCart}
        className="book-info__add"
        type="button"
        disabled={!hasBook}
        aria-disabled={!hasBook}
      >
        <ShoppingCart className="book-info__add-icon" aria-hidden="true" />
        Add to Shopping Bag
      </button>

      <button
        className="book-info__favorite"
        aria-label="Add to favorites"
        type="button"
      >
        <Heart className="book-info__favorite-icon" aria-hidden="true" />
      </button>
    </div>
  </div>
);
