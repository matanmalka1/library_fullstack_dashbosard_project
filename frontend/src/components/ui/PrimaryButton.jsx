export const PrimaryButton = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`w-full border-0 rounded-[20px] px-4 py-4 bg-indigo-600 text-white text-lg font-bold inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_16px_30px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
  />
);
