
import { Star, CheckCircle2, XCircle } from "lucide-react";

export const AdminReviewsPanel = ({ pendingReviews, onApprove, onDelete }) => (
  <div>
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
      <h2 className="text-xl font-bold text-slate-800">Review Moderation</h2>
      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em]">
        {pendingReviews.length} Pending
      </span>
    </div>

    {pendingReviews.length > 0 ? (
      <div className="grid gap-6">
        {pendingReviews.map(({ bookId, bookTitle, review }) => (
          <div
            key={review.id}
            className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
          >
            <div className="flex justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold uppercase">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 m-0">
                    {review.userName} <span>on</span>{" "}
                    <span className="text-indigo-600 italic">
                      {bookTitle}
                    </span>
                  </h4>
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onApprove(bookId, review.id)}
                  className="border-0 rounded-xl p-2 cursor-pointer bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
                  type="button"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(bookId, review.id)}
                  className="border-0 rounded-xl p-2 cursor-pointer bg-red-50 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                  type="button"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-slate-600 italic text-sm m-0 border-l-2 border-slate-200 pl-4">
              "{review.comment}"
            </p>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {new Date(review.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-20">
        <CheckCircle2 className="w-16 h-16 text-emerald-100 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-400 m-0">
          Queue is empty. Great job!
        </h3>
      </div>
    )}
  </div>
);
