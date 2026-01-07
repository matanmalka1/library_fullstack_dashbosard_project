import { Star, MessageCircle } from "lucide-react";

export const ReviewList = ({ reviews }) => (
  <div className="flex-1 grid gap-6">
    {reviews.length ? (
      reviews.map((review) => (
        <div key={review.id} className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 uppercase">
                {review.userName[0]}
              </div>
              <div>
                <h4 className="m-0 mb-1 text-sm font-bold text-slate-900">
                  {review.userName}
                </h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-2.5 h-2.5 ${
                        i <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          <p className="m-0 text-slate-600 italic text-sm">"{review.comment}"</p>
        </div>
      ))
    ) : (
      <div className="text-center py-12 text-slate-400">
        <MessageCircle className="w-12 h-12 mb-2 text-slate-200 mx-auto" />
        <p className="font-bold m-0">No verified reviews yet.</p>
      </div>
    )}
  </div>
);
