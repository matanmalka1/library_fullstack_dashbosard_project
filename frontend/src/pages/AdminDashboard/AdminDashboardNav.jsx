
import { MessageSquare, Shield } from "lucide-react";

export const AdminDashboardNav = ({ activeTab, onChangeTab }) => (
  <aside className="border-r border-slate-100 p-8 grid gap-2 shrink-0 md:w-64">
    <h1 className="font-serif text-2xl font-bold text-slate-900 mb-8">
      Admin Control
    </h1>
    <button
      onClick={() => onChangeTab("reviews")}
      className={`w-full border-0 bg-transparent px-4 py-3 rounded-2xl font-bold text-sm text-slate-500 flex items-center gap-3 cursor-pointer transition ${
        activeTab === "reviews"
          ? "bg-indigo-600 text-white shadow-[0_12px_20px_rgba(79,70,229,0.2)]"
          : "hover:bg-slate-50"
      }`}
      type="button"
    >
      <MessageSquare className="w-4 h-4" /> Pending Reviews
    </button>
    <button
      onClick={() => onChangeTab("users")}
      className={`w-full border-0 bg-transparent px-4 py-3 rounded-2xl font-bold text-sm text-slate-500 flex items-center gap-3 cursor-pointer transition ${
        activeTab === "users"
          ? "bg-indigo-600 text-white shadow-[0_12px_20px_rgba(79,70,229,0.2)]"
          : "hover:bg-slate-50"
      }`}
      type="button"
    >
      <Shield className="w-4 h-4" /> User Controls
    </button>
  </aside>
);
