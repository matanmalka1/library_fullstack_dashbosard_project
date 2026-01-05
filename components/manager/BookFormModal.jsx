
import React, { useState, useRef } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { CATEGORIES } from '../../constants';
import './BookFormModal.css';

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
    <div className="book-form-modal">
      <div className="book-form-modal__card">
        <div className="book-form-modal__header">
          <h3 className="book-form-modal__title">{editingBook ? 'Edit' : 'Add'} Book</h3>
          <button onClick={onClose} className="book-form-modal__close"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="book-form-modal__form">
          <div className="book-form-modal__body">
            <div className="book-form-modal__media">
              <div 
                className="book-form-modal__dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? <Loader2 className="book-form-modal__spinner" /> : 
                 form.coverImage ? <img src={form.coverImage} className="book-form-modal__preview" /> :
                 <Upload className="book-form-modal__upload-icon" />}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="book-form-modal__file" accept="image/*" />
            </div>
            <div className="book-form-modal__fields">
              <input className="book-form-modal__input book-form-modal__input--wide" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <input className="book-form-modal__input" placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
              <input className="book-form-modal__input" placeholder="ISBN" value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} />
              <input type="number" className="book-form-modal__input" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
              <input type="number" className="book-form-modal__input" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} />
              <select 
                className="book-form-modal__input book-form-modal__input--wide book-form-modal__select" 
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <button className="book-form-modal__submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
