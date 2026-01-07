import { Truck } from 'lucide-react';

export const OrderCardFooter = ({
  shippingAddress,
  onDownloadInvoice,
  statusHistory = [],
  status,
  canCancel,
  onCancel,
}) => (
  <div className="mt-8 pt-6 border-t border-slate-100 grid gap-4">
    <div className="inline-flex items-center gap-2 text-xs text-slate-400 italic">
      <Truck className="w-4 h-4" /> Delivered to: {shippingAddress}
    </div>
    {statusHistory.length > 0 && (
      <div className="text-xs text-slate-500">
        {statusHistory.slice(-3).map((entry, index) => (
          <div key={`${entry.status}-${entry.date}-${index}`}>
            {entry.status} - {new Date(entry.date).toLocaleString()}
            {entry.note ? ` (${entry.note})` : ""}
          </div>
        ))}
      </div>
    )}
    <div className="flex items-center justify-between flex-wrap gap-4">
      {canCancel ? (
        <button
          onClick={onCancel}
          className="border-0 bg-transparent text-red-600 font-bold text-xs cursor-pointer hover:underline"
          type="button"
        >
          Cancel Order
        </button>
      ) : (
        <span className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400">
          {status}
        </span>
      )}
      <button
        onClick={onDownloadInvoice}
        className="border-0 bg-transparent text-indigo-600 font-bold text-xs cursor-pointer hover:underline"
        type="button"
      >
        Download Invoice
      </button>
    </div>
  </div>
);
