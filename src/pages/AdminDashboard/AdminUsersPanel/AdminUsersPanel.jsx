import React from "react";
import { UserRole } from "../../../types";
import "./AdminUsersPanel.css";

export const AdminUsersPanel = ({
  users,
  currentUserId,
  roleChanges,
  onRoleChange,
  onSaveRole,
}) => (
  <div>
    <h2 className="admin-dashboard__section-title">User Management</h2>
    <div className="admin-dashboard__table-card">
      <table className="admin-dashboard__table">
        <thead className="admin-dashboard__table-head">
          <tr>
            <th className="admin-dashboard__table-cell">Name & Email</th>
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
              const isSelf = currentUserId === u.id;
              const selectedRole = roleChanges[u.id] ?? u.role;
              const canSave =
                !isSelf && roleChanges[u.id] && roleChanges[u.id] !== u.role;

              return (
                <tr key={u.id}>
                  <td className="admin-dashboard__table-cell">
                    <p className="admin-dashboard__user-name">{u.name}</p>
                    <p className="admin-dashboard__user-email">{u.email}</p>
                  </td>
                  <td className="admin-dashboard__table-cell">
                    <select
                      value={selectedRole}
                      onChange={(e) => onRoleChange(u.id, e.target.value)}
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
                      <span className="admin-dashboard__status-dot" /> Active
                    </span>
                  </td>
                  <td className="admin-dashboard__table-cell admin-dashboard__table-cell--right">
                    <button
                      className="admin-dashboard__action-btn"
                      onClick={() => onSaveRole(u.id)}
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
);
