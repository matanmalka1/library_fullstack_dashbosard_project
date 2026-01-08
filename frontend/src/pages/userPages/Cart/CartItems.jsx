
import { Trash2, Plus, Minus, Info } from 'lucide-react';

export const CartItems = ({ items, onRemove, onUpdateQuantity }) => (
  <div className="grid gap-6 flex-1">
    {items.map((item) => {
      const available = Number(item.book?.stockQuantity);
      const hasStockLimit = Number.isFinite(available);
      const isMaxed = hasStockLimit && item.quantity >= available;

      return (
      <div key={item.bookId} className="bg-white border border-slate-200 rounded-[24px] p-6 flex gap-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <div className="w-24 h-32 bg-slate-50 rounded-2xl overflow-hidden p-2">
          <img
            src={item.book.coverImage}
            alt={item.book.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{item.book.title}</h3>
              <p className="text-sm text-slate-500 m-0">by {item.book.author}</p>
              <div className="mt-2 text-[10px] uppercase tracking-[0.1em] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg inline-block">
                {item.book.categories[0]}
              </div>
            </div>
            <button
              onClick={() => onRemove(item.bookId)}
              className="border-0 bg-transparent p-2 text-slate-300 cursor-pointer transition-colors hover:text-red-500"
              type="button"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-4 mt-4">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
              <button
                onClick={() => onUpdateQuantity(item.bookId, item.quantity - 1)}
                className="w-8 h-8 border-0 rounded-lg bg-white text-slate-500 shadow-[0_4px_8px_rgba(15,23,42,0.08)] cursor-pointer flex items-center justify-center"
                type="button"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-slate-800">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.bookId, item.quantity + 1)}
                className="w-8 h-8 border-0 rounded-lg bg-white text-slate-500 shadow-[0_4px_8px_rgba(15,23,42,0.08)] cursor-pointer flex items-center justify-center disabled:text-slate-300 disabled:cursor-not-allowed"
                type="button"
                disabled={isMaxed}
                aria-disabled={isMaxed}
                title={isMaxed ? "No more stock available" : "Increase quantity"}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 m-0 mb-1">
                Price per unit: ${item.book.price.toFixed(2)}
              </p>
              <p className="text-xl font-bold text-slate-900 m-0">
                ${(item.book.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
    })}

    <div className="flex gap-4 bg-indigo-50 border border-indigo-100 rounded-[24px] p-6">
      <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
        <Info className="w-4 h-4 text-white" />
      </div>
      <p className="text-indigo-900 text-sm leading-6 m-0">
        Items will be held for <strong>60 minutes</strong>. Shipping costs and
        taxes will be calculated during the final step of checkout.
      </p>
    </div>
  </div>
);
