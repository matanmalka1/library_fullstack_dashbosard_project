
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CartSummary = ({ totalItems, totalPrice }) => (
  <aside className="w-full lg:w-[384px]">
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <h2 className="font-serif text-2xl text-slate-900 mb-8">Order Summary</h2>

      <div className="grid gap-3 mb-8">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal ({totalItems} items)</span>
          <span className="text-slate-800 font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Estimated Shipping</span>
          <span className="text-emerald-600 font-bold text-[11px] uppercase tracking-[0.08em]">
            Calculated at Checkout
          </span>
        </div>
        <div className="pt-4 border-t border-slate-200 flex justify-between items-end font-bold text-slate-900">
          <span>Total</span>
          <span className="text-[28px] text-indigo-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/checkout" className="group w-full mt-4 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-4 rounded-2xl font-bold no-underline shadow-[0_16px_30px_rgba(79,70,229,0.2)]">
        Proceed to Checkout <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Link>

      <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
        <div>
          <img
            src="https://www.svgrepo.com/show/508727/visa.svg"
            className="h-4 mx-auto grayscale opacity-50"
            alt="Visa"
          />
        </div>
        <div>
          <img
            src="https://www.svgrepo.com/show/508703/mastercard.svg"
            className="h-4 mx-auto grayscale opacity-50"
            alt="Mastercard"
          />
        </div>
      </div>
    </div>
  </aside>
);
