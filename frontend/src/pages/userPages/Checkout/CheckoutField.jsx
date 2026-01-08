export const CheckoutField = ({
  label,
  error,
  className = "",
  onBlur,
  ...inputProps
}) => (
  <div className="grid gap-2">
    <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
      {label}
    </label>
    <input
      {...inputProps}
      onBlur={onBlur}
      className={`px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 ${className}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
