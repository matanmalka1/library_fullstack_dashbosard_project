import React, { memo } from "react";
import { useCart } from "../../../../context/cart/CartContext";
import { BookCardMedia } from "../BookCardMedia/BookCardMedia";
import { BookCardBody } from "../BookCardBody/BookCardBody";
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

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <article className="book-card">
      <BookCardMedia
        id={id}
        safeTitle={safeTitle}
        safeAuthor={safeAuthor}
        coverImage={coverImage}
        isWishlisted={isWishlisted}
        onToggleWishlist={onToggleWishlist}
        isOutOfStock={isOutOfStock}
      />
      <BookCardBody
        id={id}
        safeTitle={safeTitle}
        safeAuthor={safeAuthor}
        displayRating={displayRating}
        primaryCategory={primaryCategory}
        isLowStock={isLowStock}
        qty={qty}
        displayPrice={displayPrice}
        isOutOfStock={isOutOfStock}
        onAddToCart={handleAddToCart}
      />
    </article>
  );
});

BookCard.displayName = "BookCard";
