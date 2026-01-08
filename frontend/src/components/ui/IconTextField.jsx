export const IconTextField = ({
  label,
  icon: Icon,
  error,
  inputClassName = "",
  ...inputProps
}) => {
  const paddingLeft = Icon ? "pl-12" : "pl-4";

  return (
    <div className="grid gap-2">
      {label && (
        <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
        )}
        <input
          {...inputProps}
          className={`w-full ${paddingLeft} pr-4 py-3.5 rounded-[20px] border ${
            error ? "border-red-400" : "border-slate-200"
          } bg-slate-50 text-sm outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 focus:bg-white ${inputClassName}`}
        />
      </div>
      {error && <p className="text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
};
