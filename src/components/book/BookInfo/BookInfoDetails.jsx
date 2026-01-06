import React from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";

export const BookInfoDetails = ({
  safeTitle,
  safeAuthor,
  displayRating,
  displayPrice,
  safeDescription,
  hasBook,
  onAddToCart,
}) => (
  <div className="w-full lg:w-1/2 py-6 flex flex-col gap-8">
    <header>
      <div className="flex items-center gap-2 mb-4" aria-label={`Rating: ${displayRating}`}>
        <Star
          className="w-4 h-4 text-amber-500 fill-amber-500"
          size={18}
          fill="currentColor"
          aria-hidden="true"
        />
        <span className="font-bold text-amber-700">{displayRating}</span>
        <span className="text-slate-300" aria-hidden="true">
          •
        </span>
        <span className="text-sm text-slate-500">Verified Selection</span>
      </div>

      <h1 className="font-serif text-4xl text-slate-900 leading-[1.15]">{safeTitle}</h1>

      <p className="text-lg text-slate-500 mt-2">
        by <span className="text-indigo-600 font-semibold">{safeAuthor}</span>
      </p>
    </header>

    <p className="text-2xl font-bold text-slate-900">{displayPrice}</p>

    {safeDescription && (
      <blockquote className="text-slate-600 text-lg leading-[1.7] italic border-l-4 border-indigo-100 pl-6">
        {safeDescription}
      </blockquote>
    )}

    <div className="flex gap-4 pt-6 border-t border-slate-200">
      <button
        onClick={onAddToCart}
        className="flex-1 border-0 bg-indigo-600 text-white rounded-[16px] px-5 py-4 font-bold inline-flex items-center justify-center gap-2 shadow-[0_16px_30px_rgba(79,70,229,0.25)] transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        type="button"
        disabled={!hasBook}
        aria-disabled={!hasBook}
      >
        <ShoppingCart className="w-5 h-5" aria-hidden="true" />
        Add to Shopping Bag
      </button>

      <button
        className="border border-slate-200 bg-white rounded-[16px] p-4 text-slate-300 cursor-pointer transition-colors hover:text-red-500 hover:border-red-200"
        aria-label="Add to favorites"
        type="button"
      >
        <Heart className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  </div>
);
