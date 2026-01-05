
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const InventoryTable = ({ books, onEdit, onDelete }) => (
  <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-800">Master Catalog</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <th className="px-8 py-4">Book Details</th>
            <th className="px-8 py-4">Price</th>
            <th className="px-8 py-4">Stock</th>
            <th className="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {books.map(b => (
            <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-8 py-5 flex items-center gap-4">
                <img src={b.coverImage} className="w-10 h-12 rounded object-cover shadow-sm" />
                <div>
                  <p className="font-bold text-slate-800 text-sm">{b.title}</p>
                  <p className="text-xs text-slate-400">{b.author}</p>
                </div>
              </td>
              <td className="px-8 py-5 font-bold text-sm text-slate-700">${b.price.toFixed(2)}</td>
              <td className="px-8 py-5">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${b.stockQuantity <= 5 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                  {b.stockQuantity} units
                </span>
              </td>
              <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(b)} className="p-2 text-slate-300 hover:text-indigo-600"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(b.id)} className="p-2 text-slate-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default InventoryTable;
