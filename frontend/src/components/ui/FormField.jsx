export const FormField = ({
  label,
  labelClassName,
  error,
  helper,
  as = "input",
  inputProps = {},
  inputClassName = "",
  wrapperClassName = "",
}) => {
  const isStringLabel = typeof label === "string";
  const resolvedLabelClassName =
    labelClassName ??
    (isStringLabel
      ? "text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block"
      : "");
  const Component = as;

  return (
    <div className={`grid gap-2 ${wrapperClassName}`}>
      {label &&
        (isStringLabel ? (
          <label className={resolvedLabelClassName}>{label}</label>
        ) : (
          <div className={resolvedLabelClassName}>{label}</div>
        ))}
      <Component
        {...inputProps}
        className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
          error ? "border-red-400" : "border-transparent"
        } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 ${inputClassName}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {helper && <p className="text-xs text-slate-500 mt-1">{helper}</p>}
    </div>
  );
};
