import { AdminDashboardNav } from "./AdminDashboardNav";
import { AlertBanner } from "../../components/ui/AlertBanner";
import { PageContainer } from "../../components/layout/PageContainer";

export const AdminLayout = ({ activeTab, error, children }) => (
  <PageContainer className="py-12">
    <AlertBanner message={error} className="mb-6" />
    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      <AdminDashboardNav activeTab={activeTab} />

      <main className="flex-1 p-8 bg-slate-50/60">{children}</main>
    </div>
  </PageContainer>
);
