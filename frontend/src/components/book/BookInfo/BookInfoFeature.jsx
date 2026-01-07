import  { memo } from "react";

export const BookInfoFeature = memo(({ icon: Icon, label, value }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-1.5">
    <Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
    <div className="text-center">
      <span className="block text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400">
        {label}
      </span>
      <span className="block text-xs font-bold text-slate-900">{value}</span>
    </div>
  </div>
));

BookInfoFeature.displayName = "BookInfoFeature";
