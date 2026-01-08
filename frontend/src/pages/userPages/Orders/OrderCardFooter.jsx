import { Truck } from 'lucide-react';

export const OrderCardFooter = ({
  shippingAddress,
  onDownloadInvoice,
  statusHistory = [],
  status,
  orderDate,
  canCancel,
  onCancel,
  onReorder,
}) => (
  <div className="mt-8 pt-6 border-t border-slate-100 grid gap-4">
    <div className="inline-flex items-center gap-2 text-xs text-slate-400 italic">
      <Truck className="w-4 h-4" /> Delivered to: {shippingAddress}
    </div>
    <div className="text-xs text-slate-500">
      <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-400 mb-3">
        Status Timeline
      </p>
      {(() => {
        const entries = statusHistory.length
          ? [...statusHistory]
          : status
            ? [
                {
                  status,
                  date: orderDate,
                  note: "Order placed",
                },
              ]
            : [];
        const sorted = entries
          .filter((entry) => entry?.status)
          .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
        if (!sorted.length) {
          return (
            <p className="m-0 text-slate-400">
              No status updates available yet.
            </p>
          );
        }
        return (
          <div className="grid gap-3">
            {sorted.map((entry, index) => {
              const isLast = index === sorted.length - 1;
              return (
                <div
                  key={`${entry.status}-${entry.date || index}`}
                  className="relative pl-6"
                >
                  <span
                    className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full ${
                      isLast ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                  />
                  {!isLast && (
                    <span className="absolute left-[5px] top-4 bottom-0 w-px bg-slate-200" />
                  )}
                  <p className="m-0 text-slate-600 font-semibold">
                    {entry.status}
                  </p>
                  {entry.date && (
                    <p className="m-0 text-slate-400">
                      {new Date(entry.date).toLocaleString()}
                    </p>
                  )}
                  {entry.note && (
                    <p className="m-0 text-slate-400">{entry.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
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
      <div className="flex items-center gap-4">
        {onReorder && (
          <button
            onClick={onReorder}
            className="border-0 bg-transparent text-emerald-600 font-bold text-xs cursor-pointer hover:underline"
            type="button"
          >
            Reorder
          </button>
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
  </div>
);
