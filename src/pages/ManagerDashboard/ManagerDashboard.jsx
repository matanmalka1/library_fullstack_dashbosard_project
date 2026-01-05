
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { OrderStatus } from '../../types';
import { api } from '../../services/api';
import { InventoryStats } from '../../components/manager/InventoryStats/InventoryStats';
import { InventoryTable } from '../../components/manager/InventoryTable/InventoryTable';
import { BookFormModal } from '../../components/manager/BookFormModal/BookFormModal';
import './ManagerDashboard.css';

export const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const fetchData = async () => {
    const [b, o] = await Promise.all([api.getBooks(), api.getOrders()]);
    setBooks(b);
    setOrders(o);
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this book? This action cannot be undone.')) {
      await api.deleteBook(id);
      fetchData();
    }
  };

  return (
    <div className="manager-dashboard">
      <div className="manager-dashboard__header">
        <div>
          <h1 className="manager-dashboard__title">Inventory</h1>
          <p className="manager-dashboard__subtitle">Track stock and fulfill orders.</p>
        </div>
        <button 
          onClick={() => { setEditingBook(null); setIsModalOpen(true); }}
          className="manager-dashboard__action"
        >
          <Plus className="manager-dashboard__action-icon" /> New Book
        </button>
      </div>

      <InventoryStats books={books} orders={orders} />
      
      <div className="manager-dashboard__layout">
        <div className="manager-dashboard__table">
          <InventoryTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div className="manager-dashboard__status">
          <h2 className="manager-dashboard__status-title">Order Status</h2>
          <div className="manager-dashboard__status-list">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="manager-dashboard__status-item">
                <div className="manager-dashboard__status-row">
                  <span className="manager-dashboard__status-id">#{o.id}</span>
                  <select 
                    value={o.status}
                    onChange={(e) => { api.updateOrderStatus(o.id, e.target.value); fetchData(); }}
                    className="manager-dashboard__status-select"
                  >
                    {Object.values(OrderStatus).map(s => <option key={s} value={s} className="manager-dashboard__status-option">{s}</option>)}
                  </select>
                </div>
                <div className="manager-dashboard__status-row manager-dashboard__status-row--meta">
                  <span className="manager-dashboard__status-address">{o.shippingAddress}</span>
                  <span className="manager-dashboard__status-total">${o.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookFormModal 
          editingBook={editingBook} 
          onClose={() => setIsModalOpen(false)} 
          onSaved={fetchData} 
        />
      )}
    </div>
  );
};
