import { Star } from "lucide-react";

export const ReviewSummary = ({
  ratingValue,
  reviewCount,
  isAuthenticated,
  rating,
  comment,
  onPickRating,
  onCommentChange,
  onSubmit,
}) => (
  <div className="w-full md:w-[35%]">
    <h2 className="font-serif text-2xl md:text-[32px] font-bold mb-6 text-slate-900">Insights</h2>
    <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-8">
      <div className="grid gap-2 justify-items-start mb-6">
        <span className="text-4xl font-bold text-slate-900">{ratingValue}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i <= ratingValue ? "text-amber-400 fill-amber-400" : "text-slate-200"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-500">
          {reviewCount} reviews
        </span>
      </div>
      {isAuthenticated ? (
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => onPickRating(i)}
                className="border-0 bg-transparent p-0 cursor-pointer"
              >
                <Star
                  className={`w-5 h-5 ${
                    i <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="w-full min-h-[120px] p-4 border border-slate-200 rounded-[16px] text-sm resize-y outline-none"
            placeholder="Your thoughts..."
          />
          <button className="border-0 rounded-[14px] px-4 py-3 bg-slate-900 text-white font-bold cursor-pointer transition-colors hover:bg-slate-800">
            Submit Review
          </button>
        </form>
      ) : (
        <p className="text-center text-slate-400 py-4">Sign in to leave a review.</p>
      )}
    </div>
  </div>
);
