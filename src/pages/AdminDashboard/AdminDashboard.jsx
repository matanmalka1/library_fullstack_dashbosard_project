import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../context/auth/AuthContext";
import { AdminDashboardNav } from "./AdminDashboardNav";
import { AdminReviewsPanel } from "./AdminReviewsPanel";
import { AdminUsersPanel } from "./AdminUsersPanel";

export const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [roleChanges, setRoleChanges] = useState({});
  const [activeTab, setActiveTab] = useState("reviews");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [b, u] = await Promise.all([api.getBooks(), api.getUsers()]);
    setBooks(b);
    setUsers(u);

    const pending = [];
    b.forEach((book) => {
      book.reviews.forEach((review) => {
        if (!review.approved) {
          pending.push({ bookId: book.id, bookTitle: book.title, review });
        }
      });
    });
    setPendingReviews(pending);
  };

  const handleApprove = async (bookId, reviewId) => {
    await api.approveReview(bookId, reviewId);
    fetchData();
  };

  const handleDelete = async (bookId, reviewId) => {
    if (confirm("Delete this review permanently?")) {
      await api.deleteReview(bookId, reviewId);
      fetchData();
    }
  };

  const handleRoleChange = (userId, role) => {
    setRoleChanges((prev) => ({ ...prev, [userId]: role }));
  };

  const handleSaveRole = async (userId) => {
    const role = roleChanges[userId];
    if (!role) return;
    await api.updateUserRole(userId, role);
    setRoleChanges((prev) => {
      const next = { ...prev };
      delete next[userId];
      return next;
    });
    fetchData();
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-12">
      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        <AdminDashboardNav activeTab={activeTab} onChangeTab={setActiveTab} />

        {/* Main Area */}
        <main className="flex-1 p-8 bg-slate-50/60">
          {activeTab === "reviews" ? (
            <AdminReviewsPanel
              pendingReviews={pendingReviews}
              onApprove={handleApprove}
              onDelete={handleDelete}
            />
          ) : (
            <AdminUsersPanel
              users={users}
              currentUserId={currentUser?.id}
              roleChanges={roleChanges}
              onRoleChange={handleRoleChange}
              onSaveRole={handleSaveRole}
            />
          )}
        </main>
      </div>
    </div>
  );
};
