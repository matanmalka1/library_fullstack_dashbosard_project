
import React, { useState, useRef } from 'react';
import { X, Upload, Loader2, RotateCcw, Trash2, Camera, ImageIcon } from 'lucide-react';
import { api } from '../../services/api';
import { CATEGORIES } from '../../constants';

const BookFormModal = ({ editingBook, onClose, onSaved }) => {
  const [form, setForm] = useState({
    title: editingBook?.title || '',
    author: editingBook?.author || '',
    isbn: editingBook?.isbn || '',
    price: editingBook?.price || 0,
    stock: editingBook?.stockQuantity || 0,
    category: editingBook?.categories?.[0] || CATEGORIES[0],
    coverImage: editingBook?.coverImage || ''
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, coverImage: reader.result }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.isbn) return;
    await api.saveBook({
      ...editingBook, ...form, 
      price: Number(form.price), stockQuantity: Number(form.stock), categories: [form.category]
    });
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        <div className="p-8 border-b flex justify-between items-center">
          <h3 className="text-2xl font-serif font-bold">{editingBook ? 'Edit' : 'Add'} Book</h3>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-600"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              <div 
                className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative group"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? <Loader2 className="animate-spin text-indigo-600" /> : 
                 form.coverImage ? <img src={form.coverImage} className="w-full h-full object-cover" /> :
                 <Upload className="text-slate-300" />}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
            <div className="flex-grow grid grid-cols-2 gap-4">
              <input className="col-span-2 px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <input className="px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
              <input className="px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="ISBN" value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} />
              <input type="number" className="px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
              <input type="number" className="px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} />
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
