import React from 'react';
import { ShieldCheck, Truck } from 'lucide-react';

export const CheckoutSummary = ({ items, totalPrice, loading }) => (
  <aside className="w-full lg:w-[384px]">
    <div className="bg-slate-900 text-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(15,23,42,0.3)]">
      <h2 className="font-serif text-2xl mb-8">Your Order</h2>

      <div className="max-h-60 overflow-y-auto pr-2 grid gap-4 mb-8">
        {items.map((item) => (
          <div key={item.bookId} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg p-1">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="m-0 text-xs font-bold">{item.book.title}</h4>
                <p className="m-0 mt-0.5 text-[10px] text-slate-400">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold">
              ${(item.book.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-6 mb-8 grid gap-3">
        <div className="flex justify-between text-slate-400">
          <span>Items Subtotal</span>
          <span className="text-white">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Shipping Fee</span>
          <span className="text-emerald-400 text-[10px] uppercase tracking-[0.14em] font-bold">
            Free
          </span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t border-white/10 pt-4">
          <span>Total Pay</span>
          <span className="text-indigo-400">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        form="checkout-form"
        type="submit"
        disabled={loading}
        className="w-full border-0 rounded-2xl px-4 py-4 bg-indigo-500 text-white font-bold text-base cursor-pointer shadow-[0_18px_30px_rgba(15,23,42,0.3)] disabled:opacity-60"
      >
        {loading ? 'Processing...' : 'Complete Purchase'}
      </button>

      <div className="mt-8 grid grid-cols-2 gap-4 text-center text-white/60 uppercase text-[10px] tracking-[0.18em] font-bold">
        <div>
          <Truck className="w-5 h-5 mx-auto mb-1" />
          <span>Express</span>
        </div>
        <div>
          <ShieldCheck className="w-5 h-5 mx-auto mb-1" />
          <span>Secure</span>
        </div>
      </div>
    </div>
  </aside>
);
