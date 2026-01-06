import React from "react";
import {
  Package,
  AlertTriangle,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";
import { OrderStatus } from "../../../types";

// Reusable Stat Card Component
const Stat = ({ icon: Icon, color, value, label, trend = false }) => (
  <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && <TrendingUp className="w-4 h-4 text-emerald-500" />}
    </div>
    <p className="text-2xl font-bold text-slate-900 m-0">{value}</p>
    <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-400 mt-1">
      {label}
    </p>
  </div>
);

export const InventoryStats = ({ books = [], orders = [] }) => {
  // Derived stats
  const lowStock = books.filter((b) => b.stockQuantity <= 5).length;

  const revenue = orders.reduce(
    (acc, o) => (o.status !== OrderStatus.CANCELLED ? acc + o.total : acc),
    0
  );

  return (
    <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-4">
      <Stat
        icon={Package}
        color="bg-indigo-50 text-indigo-600"
        value={books.length.toLocaleString()}
        label="Active Titles"
        trend
      />
      <Stat
        icon={AlertTriangle}
        color="bg-amber-50 text-amber-600"
        value={lowStock.toLocaleString()}
        label="Low Stock"
      />
      <Stat
        icon={DollarSign}
        color="bg-emerald-50 text-emerald-600"
        value={`$${revenue.toFixed(2)}`}
        label="Revenue"
      />
      <Stat
        icon={Users}
        color="bg-blue-50 text-blue-600"
        value={orders.length.toLocaleString()}
        label="Total Orders"
      />
    </div>
  );
};
