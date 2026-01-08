import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const OrderCardItems = ({ items }) => (
  <div className="grid gap-6">
    {items.map((item) => (
      <div key={item.bookId} className="flex gap-4">
        <div className="w-16 h-20 bg-slate-50 border border-slate-200 rounded-xl p-1.5 shrink-0">
          <img
            src={item.book.coverImage}
            alt={item.book.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h4 className="m-0 mb-1 text-sm font-bold text-slate-800">{item.book.title}</h4>
          <p className="m-0 mb-2 text-xs text-slate-500">{item.book.author}</p>
          <div className="flex items-center gap-3 text-xs">
            <span className="bg-slate-100 px-2 py-1 rounded-lg text-slate-600 font-semibold">
              Qty: {item.quantity}
            </span>
            <span className="font-bold text-slate-800">
              ${(item.book.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
        <Link to={`/books/${item.bookId}`} className="self-center text-slate-300 p-2 transition-colors hover:text-indigo-600">
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    ))}
  </div>
);
