import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

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
    <div className="relative aspect-[3/4] overflow-hidden">
      <Link to={`/books/${id}`} aria-label={`View details for ${safeTitle}`}>
        <img
          src={coverImage}
          alt={`Cover of ${safeTitle} by ${safeAuthor}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
          loading="lazy"
        />
      </Link>

      <div className="absolute top-3 right-3 flex gap-2 opacity-0 translate-x-6 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`w-9 h-9 rounded-full inline-flex items-center justify-center shadow-[0_10px_20px_rgba(15,23,42,0.12)] cursor-pointer transition-colors ${
            isWishlisted ? "bg-red-50 text-red-500" : "bg-white text-slate-400 hover:text-red-500"
          }`}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      {isOutOfStock && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center" aria-hidden="true">
          <span className="bg-white px-4 py-2 rounded-full font-bold text-sm text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.15)]">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
};
