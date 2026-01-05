import React, { memo } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useCart } from "../../../context/cart/CartContext";
import "./BookInfo.css";

const Feature = memo(({ icon: Icon, label, value }) => (
  <div className="book-info__feature">
    <Icon className="book-info__feature-icon" aria-hidden="true" />
    <div className="book-info__feature-text">
      <span className="book-info__feature-label">{label}</span>
      <span className="book-info__feature-value">{value}</span>
    </div>
  </div>
));

Feature.displayName = "Feature";

export const BookInfo = ({ book }) => {
  const { addToCart } = useCart();

  const { coverImage, title, author, price, rating, description } = book || {};

  const safeTitle = title || "Untitled";
  const safeAuthor = author || "Unknown author";
  const safeDescription = description || "";

  const displayRating =
    Number.isFinite(Number(rating)) && Number(rating) > 0
      ? Number(rating).toFixed(1)
      : "New";

  const displayPrice = `$${Number(price ?? 0).toFixed(2)}`;

  const handleAddToCart = () => {
    if (!book) return;
    addToCart(book);
  };

  return (
    <article className="book-info">
      {/* Media Section */}
      <div className="book-info__media">
        <div className="book-info__image-wrap">
          <img
            src={coverImage}
            alt={`Cover of ${safeTitle}`}
            className="book-info__image"
            loading="lazy"
          />
        </div>

        <div className="book-info__features">
          <Feature icon={Truck} label="Delivery" value="Express" />
          <Feature icon={RotateCcw} label="Returns" value="30 Days" />
          <Feature icon={Shield} label="Safe" value="Verified" />
        </div>
      </div>

      {/* Details Section */}
      <div className="book-info__details">
        <header className="book-info__header">
          <div
            className="book-info__rating"
            aria-label={`Rating: ${displayRating}`}
          >
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
            onClick={handleAddToCart}
            className="book-info__add"
            type="button"
            disabled={!book}
            aria-disabled={!book}
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
    </article>
  );
};
