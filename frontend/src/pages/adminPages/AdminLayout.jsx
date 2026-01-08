import { AdminDashboardNav } from "./AdminDashboardNav";
import { AlertBanner } from "../../components/ui/AlertBanner";

export const AdminLayout = ({ activeTab, error, children }) => (
  <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-12">
    <AlertBanner message={error} className="mb-6" />
    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      <AdminDashboardNav activeTab={activeTab} />

      <main className="flex-1 p-8 bg-slate-50/60">{children}</main>
    </div>
  </div>
);
