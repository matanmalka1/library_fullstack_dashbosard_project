import React from "react";
import { MessageSquare, Shield } from "lucide-react";
import "./AdminDashboardNav.css";

export const AdminDashboardNav = ({ activeTab, onChangeTab }) => (
  <aside className="admin-dashboard__nav">
    <h1 className="admin-dashboard__nav-title">Admin Control</h1>
    <button
      onClick={() => onChangeTab("reviews")}
      className={`admin-dashboard__nav-button ${
        activeTab === "reviews" ? "is-active" : ""
      }`}
    >
      <MessageSquare className="admin-dashboard__nav-icon" /> Pending Reviews
    </button>
    <button
      onClick={() => onChangeTab("users")}
      className={`admin-dashboard__nav-button ${
        activeTab === "users" ? "is-active" : ""
      }`}
    >
      <Shield className="admin-dashboard__nav-icon" /> User Controls
    </button>
  </aside>
);
