import React from 'react';
import { CreditCard } from 'lucide-react';

export const CheckoutForm = ({
  userName,
  address,
  city,
  zip,
  onAddressChange,
  onCityChange,
  onZipChange,
  onSubmit,
}) => (
  <div className="flex-1">
    <h1 className="font-serif text-[32px] text-slate-900 mb-8">Secure Checkout</h1>

    <div className="grid gap-10">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-800 m-0">Shipping Details</h2>
        </div>
        <form id="checkout-form" onSubmit={onSubmit} className="grid grid-cols-1 gap-5 bg-white border border-slate-200 rounded-[24px] p-8 shadow-[0_8px_20px_rgba(15,23,42,0.05)] md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              value={userName}
              disabled
              className="px-4 py-3 rounded-[14px] border border-slate-200 bg-slate-50 text-sm text-slate-400"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
              Street Address
            </label>
            <input
              type="text"
              required
              className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
              placeholder="123 Reading Lane"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
              City
            </label>
            <input
              type="text"
              required
              className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
              placeholder="New York"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
              Zip Code
            </label>
            <input
              type="text"
              required
              className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
              placeholder="10001"
              value={zip}
              onChange={(e) => onZipChange(e.target.value)}
            />
          </div>
        </form>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-800 m-0">Payment Method</h2>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-[24px] p-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <CreditCard className="w-8 h-8 text-indigo-600" />
            <div>
              <h4 className="m-0 font-bold text-slate-800">Pay on Delivery</h4>
              <p className="mt-1 text-indigo-600 text-xs font-semibold">
                Safe & Contactless payment when items arrive.
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-white border border-indigo-200 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-indigo-600" />
          </div>
        </div>
      </section>
    </div>
  </div>
);
