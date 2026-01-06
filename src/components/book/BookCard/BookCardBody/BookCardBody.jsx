import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, AlertCircle } from "lucide-react";
import "./BookCardBody.css";

export const BookCardBody = ({
  id,
  safeTitle,
  safeAuthor,
  displayRating,
  primaryCategory,
  isLowStock,
  qty,
  displayPrice,
  isOutOfStock,
  onAddToCart,
}) => (
  <div className="book-card__body">
    <div className="book-card__meta">
      <Star className="book-card__star" size={16} />
      <span className="book-card__rating">{displayRating}</span>
      <span className="book-card__dot" aria-hidden="true">
        •
      </span>
      <span className="book-card__category">{primaryCategory}</span>
    </div>

    <Link to={`/books/${id}`} className="book-card__title-link">
      <h3 className="book-card__title">{safeTitle}</h3>
    </Link>

    <p className="book-card__author">by {safeAuthor}</p>

    {isLowStock && (
      <div className="book-card__low-stock" role="status">
        <AlertCircle className="book-card__low-stock-icon" size={14} />
        <span>Only {qty} left!</span>
      </div>
    )}

    <div className="book-card__footer">
      <span className="book-card__price">${displayPrice}</span>

      {!isOutOfStock && (
        <button
          type="button"
          onClick={onAddToCart}
          className="book-card__add"
          aria-label={`Add ${safeTitle} to cart`}
          title="Add to Cart"
        >
          <ShoppingCart className="book-card__add-icon" />
        </button>
      )}
    </div>
  </div>
);
