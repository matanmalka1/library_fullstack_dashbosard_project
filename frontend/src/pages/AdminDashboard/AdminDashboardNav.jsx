
import { Link } from "react-router-dom";
import { MessageSquare, Shield } from "lucide-react";

export const AdminDashboardNav = ({ activeTab }) => (
  <aside className="border-r border-slate-100 p-8 flex flex-col items-center shrink-0 md:w-64">
    <div className="w-full flex flex-col items-center justify-center gap-6 my-auto">
      <h1 className="font-serif text-2xl font-bold text-slate-900 text-center">
        Admin Control
      </h1>
      {activeTab === "reviews" && (
        <Link
          to="/admin/reviews"
          className="w-full border-0 bg-transparent px-4 py-3 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-3 cursor-pointer transition no-underline bg-indigo-600 shadow-[0_12px_20px_rgba(79,70,229,0.2)]"
        >
          <MessageSquare className="w-4 h-4" /> Pending Reviews
        </Link>
      )}
      {activeTab === "users" && (
        <Link
          to="/admin/users"
          className="w-full border-0 bg-transparent px-4 py-3 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-3 cursor-pointer transition no-underline bg-indigo-600 shadow-[0_12px_20px_rgba(79,70,229,0.2)]"
        >
          <Shield className="w-4 h-4" /> User Controls
        </Link>
      )}
    </div>
  </aside>
);
