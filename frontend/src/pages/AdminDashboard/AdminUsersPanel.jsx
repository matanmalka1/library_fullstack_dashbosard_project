import React from "react";
import { UserRole } from "../../types";

export const AdminUsersPanel = ({
  users,
  currentUserId,
  roleChanges,
  onRoleChange,
  onSaveRole,
}) => (
  <div>
    <h2 className="text-xl font-bold text-slate-800 mb-6">User Management</h2>
    <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.16em] font-bold text-slate-400">
          <tr>
            <th className="px-8 py-5">Name & Email</th>
            <th className="px-8 py-5">Role</th>
            <th className="px-8 py-5">Status</th>
            <th className="px-8 py-5 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((u) => {
              const isSelf = currentUserId === u.id;
              const selectedRole = roleChanges[u.id] ?? u.role;
              const canSave =
                !isSelf && roleChanges[u.id] && roleChanges[u.id] !== u.role;

              return (
                <tr key={u.id}>
                  <td className="px-8 py-5 text-sm border-b border-slate-100">
                    <p className="m-0 mb-1 font-bold text-slate-800">{u.name}</p>
                    <p className="m-0 text-xs text-slate-400">{u.email}</p>
                  </td>
                  <td className="px-8 py-5 text-sm border-b border-slate-100">
                    <select
                      value={selectedRole}
                      onChange={(e) => onRoleChange(u.id, e.target.value)}
                      className="w-full border border-slate-200 rounded-[10px] px-2.5 py-1.5 bg-white text-xs font-bold text-slate-800 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                      disabled={isSelf}
                    >
                      {Object.values(UserRole).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-8 py-5 text-sm border-b border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm border-b border-slate-100 text-right">
                    <button
                      className="border-0 bg-indigo-600 text-white font-bold text-xs rounded-[10px] px-3.5 py-2 cursor-pointer transition disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
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
                className="px-8 py-5 text-center text-slate-400"
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
