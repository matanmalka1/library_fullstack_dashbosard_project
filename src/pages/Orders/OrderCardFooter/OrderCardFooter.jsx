import React from 'react';
import { Truck } from 'lucide-react';

export const OrderCardFooter = ({ shippingAddress, onDownloadInvoice }) => (
  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
    <div className="inline-flex items-center gap-2 text-xs text-slate-400 italic">
      <Truck className="w-4 h-4" /> Delivered to: {shippingAddress}
    </div>
    <button onClick={onDownloadInvoice} className="border-0 bg-transparent text-indigo-600 font-bold text-xs cursor-pointer hover:underline" type="button">
      Download Invoice
    </button>
  </div>
);
