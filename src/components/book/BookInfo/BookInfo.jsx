import React from "react";
import { useCart } from "../../../context/cart/CartContext";
import { BookInfoMedia } from "../BookInfoMedia/BookInfoMedia";
import { BookInfoDetails } from "../BookInfoDetails/BookInfoDetails";

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
    <article className="flex flex-col gap-16 lg:flex-row">
      <BookInfoMedia coverImage={coverImage} safeTitle={safeTitle} />
      <BookInfoDetails
        safeTitle={safeTitle}
        safeAuthor={safeAuthor}
        displayRating={displayRating}
        displayPrice={displayPrice}
        safeDescription={safeDescription}
        hasBook={Boolean(book)}
        onAddToCart={handleAddToCart}
      />
    </article>
  );
};
