
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { OrderStatus } from '../../types';
import { api } from '../../services/api';
import InventoryStats from '../../components/manager/InventoryStats';
import InventoryTable from '../../components/manager/InventoryTable';
import BookFormModal from '../../components/manager/BookFormModal';

const ManagerDashboard = () => {
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Inventory</h1>
          <p className="text-slate-500">Track stock and fulfill orders.</p>
        </div>
        <button 
          onClick={() => { setEditingBook(null); setIsModalOpen(true); }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" /> New Book
        </button>
      </div>

      <InventoryStats books={books} orders={orders} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <InventoryTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6">Order Status</h2>
          <div className="space-y-6">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="border-b border-white/10 pb-4 last:border-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-400 font-bold">#{o.id}</span>
                  <select 
                    value={o.status}
                    onChange={(e) => { api.updateOrderStatus(o.id, e.target.value); fetchData(); }}
                    className="bg-transparent border-none text-white text-[10px] uppercase font-bold outline-none cursor-pointer"
                  >
                    {Object.values(OrderStatus).map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
                  </select>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{o.shippingAddress}</span>
                  <span className="text-sm font-bold">${o.total.toFixed(2)}</span>
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

export default ManagerDashboard;
