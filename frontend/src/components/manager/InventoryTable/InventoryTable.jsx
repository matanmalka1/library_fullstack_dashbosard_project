import { Edit, Trash2 } from 'lucide-react';

export const InventoryTable = ({
  books,
  onEdit,
  onDelete,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const start = totalItems ? (page - 1) * pageSize + 1 : 0;
  const end = totalItems ? Math.min(page * pageSize, totalItems) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      <div className="px-8 py-8 border-b border-slate-100 flex items-center justify-between">
        <h2 className="m-0 text-xl font-bold text-slate-800">Master Catalog</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400">
              <th className="px-8 py-5">Book Details</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5">Stock</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr
                key={b.id}
                className="border-t border-slate-100 transition-colors hover:bg-slate-50/60"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-10 h-12 rounded-lg object-cover shadow-[0_6px_12px_rgba(15,23,42,0.08)]"
                    />
                    <div>
                      <p className="m-0 text-sm font-bold text-slate-800">
                        {b.title}
                      </p>
                      <p className="m-0 mt-0.5 text-xs text-slate-400">
                        {b.author}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-slate-600">
                  ${b.price.toFixed(2)}
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      b.stockQuantity <= 5
                        ? "bg-orange-50 text-orange-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {b.stockQuantity} units
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(b)}
                      className="border-0 bg-transparent p-2 cursor-pointer text-slate-300 transition-colors hover:text-indigo-600"
                      type="button"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(b.id)}
                      className="border-0 bg-transparent p-2 cursor-pointer text-slate-300 transition-colors hover:text-red-500"
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Showing {start}-{end} of {totalItems}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="border border-slate-200 bg-white text-slate-500 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Prev
            </button>
            <span className="text-xs font-bold text-slate-500">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="border border-slate-200 bg-white text-slate-500 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
