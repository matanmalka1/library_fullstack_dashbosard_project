
import React from 'react';
import { Package, AlertTriangle, DollarSign, Users, TrendingUp } from 'lucide-react';
import { OrderStatus } from '../../types';
import './InventoryStats.css';

const InventoryStats = ({ books, orders }) => {
  const lowStock = books.filter(b => b.stockQuantity <= 5).length;
  const revenue = orders.reduce((acc, o) => o.status !== OrderStatus.CANCELLED ? acc + o.total : acc, 0);

  const Stat = ({ icon: Icon, color, value, label, trend }) => (
    <div className="inventory-stats__card">
      <div className="inventory-stats__card-header">
        <div className={`inventory-stats__icon ${color}`}>
          <Icon className="inventory-stats__icon-svg" />
        </div>
        {trend && <TrendingUp className="inventory-stats__trend" />}
      </div>
      <p className="inventory-stats__value">{value}</p>
      <p className="inventory-stats__label">{label}</p>
    </div>
  );

  return (
    <div className="inventory-stats">
      <Stat icon={Package} color="inventory-stats__icon--indigo" value={books.length} label="Active Titles" trend />
      <Stat icon={AlertTriangle} color="inventory-stats__icon--amber" value={lowStock} label="Low Stock" />
      <Stat icon={DollarSign} color="inventory-stats__icon--green" value={`$${revenue.toFixed(2)}`} label="Revenue" />
      <Stat icon={Users} color="inventory-stats__icon--blue" value={orders.length} label="Total Orders" />
    </div>
  );
};

export default InventoryStats;
