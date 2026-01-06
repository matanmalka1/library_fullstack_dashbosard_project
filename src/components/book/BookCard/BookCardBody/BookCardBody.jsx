import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, AlertCircle } from "lucide-react";

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
  <div className="p-5 flex flex-col flex-1">
    <div className="flex items-center gap-1 mb-2">
      <Star className="w-4 h-4 text-amber-400 fill-amber-400" size={16} />
      <span className="text-xs font-bold text-slate-700">{displayRating}</span>
      <span className="text-slate-300 mx-1" aria-hidden="true">
        •
      </span>
      <span className="text-[10px] uppercase tracking-[0.08em] font-bold text-slate-400">
        {primaryCategory}
      </span>
    </div>

    <Link to={`/books/${id}`} className="no-underline mb-1 group">
      <h3 className="text-lg font-bold text-slate-800 leading-[1.2] transition-colors group-hover:text-indigo-600">
        {safeTitle}
      </h3>
    </Link>

    <p className="text-sm font-medium text-slate-500 mb-3">by {safeAuthor}</p>

    {isLowStock && (
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full mb-3 w-fit" role="status">
        <AlertCircle className="w-3.5 h-3.5" size={14} />
        <span>Only {qty} left!</span>
      </div>
    )}

    <div className="flex items-center justify-between mt-auto">
      <span className="text-xl font-bold text-slate-900">${displayPrice}</span>

      {!isOutOfStock && (
        <button
          type="button"
          onClick={onAddToCart}
          className="border-0 bg-indigo-50 text-indigo-600 p-2.5 rounded-[14px] cursor-pointer shadow-[0_6px_12px_rgba(15,23,42,0.08)] transition-all hover:bg-indigo-600 hover:text-white inline-flex items-center justify-center"
          aria-label={`Add ${safeTitle} to cart`}
          title="Add to Cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      )}
    </div>
  </div>
);
