export const FormSubmitButton = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`border-0 rounded-[14px] px-4 py-3 bg-indigo-600 text-white font-bold cursor-pointer shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4 ${className}`}
  />
);
