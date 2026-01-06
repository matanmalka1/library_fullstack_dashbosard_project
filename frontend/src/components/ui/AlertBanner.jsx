import React from "react";

const TONE_STYLES = {
  error: "bg-red-50 border-red-100 text-red-600",
  info: "bg-slate-50 border-slate-200 text-slate-600",
  success: "bg-emerald-50 border-emerald-100 text-emerald-600",
};

export const AlertBanner = ({ message, tone = "error", className = "" }) => {
  if (!message) return null;

  const styles = TONE_STYLES[tone] || TONE_STYLES.error;

  return (
    <div
      className={`p-4 border rounded-2xl text-sm font-semibold ${styles} ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
};
