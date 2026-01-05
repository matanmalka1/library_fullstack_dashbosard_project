import { useEffect, useState } from "react";
import {
  Star,
  CheckCircle2,
  XCircle,
  Shield,
  User as UserIcon,
  MessageSquare,
  Book as BookIcon,
} from "lucide-react";
import { UserRole } from "../../types";
import { api } from "../../services/api";
import { useAuth } from "../../context/auth/AuthContext";
import "./AdminDashboard.css";

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
    <div className="admin-dashboard">
      <div className="admin-dashboard__layout">
        {/* Left Nav */}
        <aside className="admin-dashboard__nav">
          <h1 className="admin-dashboard__nav-title">Admin Control</h1>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`admin-dashboard__nav-button ${
              activeTab === "reviews" ? "is-active" : ""
            }`}
          >
            <MessageSquare className="admin-dashboard__nav-icon" /> Pending
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`admin-dashboard__nav-button ${
              activeTab === "users" ? "is-active" : ""
            }`}
          >
            <Shield className="admin-dashboard__nav-icon" /> User Controls
          </button>
        </aside>

        {/* Main Area */}
        <main className="admin-dashboard__main">
          {activeTab === "reviews" ? (
            <div className="admin-dashboard__reviews">
              <div className="admin-dashboard__section-header">
                <h2 className="admin-dashboard__section-title">
                  Review Moderation
                </h2>
                <span className="admin-dashboard__badge">
                  {pendingReviews.length} Pending
                </span>
              </div>

              {pendingReviews.length > 0 ? (
                <div className="admin-dashboard__review-list">
                  {pendingReviews.map(({ bookId, bookTitle, review }) => (
                    <div
                      key={review.id}
                      className="admin-dashboard__review-card"
                    >
                      <div className="admin-dashboard__review-header">
                        <div className="admin-dashboard__review-user">
                          <div className="admin-dashboard__review-avatar">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="admin-dashboard__review-title">
                              {review.userName} <span>on</span>{" "}
                              <span className="admin-dashboard__review-book">
                                {bookTitle}
                              </span>
                            </h4>
                            <div className="admin-dashboard__review-stars">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  className={`admin-dashboard__star ${
                                    i <= review.rating ? "is-active" : ""
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="admin-dashboard__review-actions">
                          <button
                            onClick={() => handleApprove(bookId, review.id)}
                            className="admin-dashboard__review-action admin-dashboard__review-action--approve"
                          >
                            <CheckCircle2 className="admin-dashboard__review-action-icon" />
                          </button>
                          <button
                            onClick={() => handleDelete(bookId, review.id)}
                            className="admin-dashboard__review-action admin-dashboard__review-action--delete"
                          >
                            <XCircle className="admin-dashboard__review-action-icon" />
                          </button>
                        </div>
                      </div>
                      <p className="admin-dashboard__review-text">
                        "{review.comment}"
                      </p>
                      <p className="admin-dashboard__review-date">
                        {new Date(review.date).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="admin-dashboard__empty">
                  <CheckCircle2 className="admin-dashboard__empty-icon" />
                  <h3 className="admin-dashboard__empty-text">
                    Queue is empty. Great job!
                  </h3>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="admin-dashboard__section-title">
                User Management
              </h2>
              <div className="admin-dashboard__table-card">
                <table className="admin-dashboard__table">
                  <thead className="admin-dashboard__table-head">
                    <tr>
                      <th className="admin-dashboard__table-cell">
                        Name & Email
                      </th>
                      <th className="admin-dashboard__table-cell">Role</th>
                      <th className="admin-dashboard__table-cell">Status</th>
                      <th className="admin-dashboard__table-cell admin-dashboard__table-cell--right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="admin-dashboard__table-body">
                    {users.length ? (
                      users.map((u) => {
                        const isSelf = currentUser?.id === u.id;
                        const selectedRole = roleChanges[u.id] ?? u.role;
                        const canSave =
                          !isSelf && roleChanges[u.id] && roleChanges[u.id] !== u.role;

                        return (
                          <tr key={u.id}>
                            <td className="admin-dashboard__table-cell">
                              <p className="admin-dashboard__user-name">
                                {u.name}
                              </p>
                              <p className="admin-dashboard__user-email">
                                {u.email}
                              </p>
                            </td>
                            <td className="admin-dashboard__table-cell">
                              <select
                                value={selectedRole}
                                onChange={(e) =>
                                  handleRoleChange(u.id, e.target.value)
                                }
                                className="admin-dashboard__role-select"
                                disabled={isSelf}
                              >
                                {Object.values(UserRole).map((role) => (
                                  <option key={role} value={role}>
                                    {role}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="admin-dashboard__table-cell">
                              <span className="admin-dashboard__status">
                                <span className="admin-dashboard__status-dot" />{" "}
                                Active
                              </span>
                            </td>
                            <td className="admin-dashboard__table-cell admin-dashboard__table-cell--right">
                              <button
                                className="admin-dashboard__action-btn"
                                onClick={() => handleSaveRole(u.id)}
                                disabled={!canSave}
                                title={isSelf ? "Cannot edit your own role" : ""}
                                type="button"
                              >
                                Save
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          className="admin-dashboard__table-cell admin-dashboard__table-cell--empty"
                          colSpan={4}
                        >
                          No users found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
