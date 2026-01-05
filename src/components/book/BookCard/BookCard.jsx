import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, AlertCircle } from "lucide-react";
import { useCart } from "../../../context/cart/CartContext";
import "./BookCard.css";

export const BookCard = memo(({ book, isWishlisted, onToggleWishlist }) => {
  const { addToCart } = useCart();

  const {
    id,
    title,
    author,
    coverImage,
    rating,
    categories,
    stockQuantity,
    price,
  } = book || {};

  const safeTitle = title || "Untitled";
  const safeAuthor = author || "Unknown author";
  const primaryCategory = categories?.[0] || "General";

  const qty = Number(stockQuantity ?? 0);
  const isOutOfStock = qty === 0;
  const isLowStock = qty > 0 && qty <= 5;

  const displayRating =
    Number.isFinite(Number(rating)) && Number(rating) > 0
      ? Number(rating).toFixed(1)
      : "New";

  const displayPrice = Number(price ?? 0).toFixed(2);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist?.(id);
  };

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <article className="book-card">
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
            className={`book-card__wishlist-btn ${
              isWishlisted ? "is-active" : ""
            }`}
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
              onClick={handleAddToCart}
              className="book-card__add"
              aria-label={`Add ${safeTitle} to cart`}
              title="Add to Cart"
            >
              <ShoppingCart className="book-card__add-icon" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
});

BookCard.displayName = "BookCard";
