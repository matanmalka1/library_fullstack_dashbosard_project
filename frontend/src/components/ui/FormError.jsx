export const FormError = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <div
      className={`text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}
    >
      {message}
    </div>
  );
};
