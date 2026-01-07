
import { CheckCircle2 } from 'lucide-react';

export const CheckoutSuccess = ({ email }) => (
  <div className="max-w-[1120px] mx-auto px-4 py-32 text-center animate-[checkout-pop_0.3s_ease]">
    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
    </div>
    <h1 className="font-serif text-4xl text-slate-900 mb-4">Order Confirmed!</h1>
    <p className="text-slate-500 text-lg mb-8">
      Thank you for your purchase. We've sent a confirmation email to{' '}
      <strong>{email}</strong>.
    </p>
    <p className="text-slate-400 m-0">Redirecting to your order history...</p>
  </div>
);
