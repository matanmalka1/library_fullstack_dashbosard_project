
import React from 'react';
import { Package, AlertTriangle, DollarSign, Users, TrendingUp } from 'lucide-react';
import { OrderStatus } from '../../types';

const InventoryStats = ({ books, orders }) => {
  const lowStock = books.filter(b => b.stockQuantity <= 5).length;
  const revenue = orders.reduce((acc, o) => o.status !== OrderStatus.CANCELLED ? acc + o.total : acc, 0);

  const Stat = ({ icon: Icon, color, value, label, trend }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && <TrendingUp className="text-green-500 w-4 h-4" />}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{label}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <Stat icon={Package} color="bg-indigo-50 text-indigo-600" value={books.length} label="Active Titles" trend />
      <Stat icon={AlertTriangle} color="bg-amber-50 text-amber-600" value={lowStock} label="Low Stock" />
      <Stat icon={DollarSign} color="bg-green-50 text-green-600" value={`$${revenue.toFixed(2)}`} label="Revenue" />
      <Stat icon={Users} color="bg-blue-50 text-blue-600" value={orders.length} label="Total Orders" />
    </div>
  );
};

export default InventoryStats;
