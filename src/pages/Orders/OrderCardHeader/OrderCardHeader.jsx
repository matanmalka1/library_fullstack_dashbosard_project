import React from 'react';
import { Calendar } from 'lucide-react';

export const OrderCardHeader = ({
  orderId,
  orderDate,
  total,
  status,
  statusClassName,
  statusIcon,
}) => (
  <div className="bg-slate-50 px-6 py-6 flex flex-wrap justify-between gap-6 border-b border-slate-200">
    <div className="flex flex-wrap gap-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400 mb-1">Order ID</p>
        <p className="text-sm font-bold text-slate-800 m-0">#{orderId}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400 mb-1">Date Placed</p>
        <p className="text-sm font-bold text-slate-800 m-0 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />{' '}
          {new Date(orderDate).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400 mb-1">Total Amount</p>
        <p className="text-sm font-bold text-indigo-600 m-0">
          ${total.toFixed(2)}
        </p>
      </div>
    </div>

    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.08em] ${statusClassName}`}>
      {statusIcon} <span>{status}</span>
    </div>
  </div>
);
