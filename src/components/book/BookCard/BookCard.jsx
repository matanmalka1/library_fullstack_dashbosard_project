import React, { memo } from "react";
import { useCart } from "../../../context/cart/CartContext";
import { BookCardMedia } from "./BookCardMedia";
import { BookCardBody } from "./BookCardBody";

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
    <article className="group bg-white border border-slate-200 rounded-[20px] overflow-hidden flex flex-col h-full transition-all hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] hover:-translate-y-0.5">
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
