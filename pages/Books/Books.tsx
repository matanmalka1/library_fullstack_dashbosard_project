
import React, { useState, useEffect } from 'react';
import { Search, Grid, List, ChevronDown } from 'lucide-react';
import { Book } from '../../types';
import { api } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';
import { CATEGORIES } from '../../constants';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('latest');
  const [priceMax, setPriceMax] = useState(200);

  useEffect(() => { api.getBooks().then(b => { setBooks(b); setFiltered(b); }); }, []);

  useEffect(() => {
    let res = books.filter(b => 
      (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())) &&
      (cat === 'All' || b.categories.includes(cat)) && (b.price <= priceMax)
    );
    if (sort === 'price-low') res.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') res.sort((a, b) => b.price - a.price);
    if (sort === 'rating') res.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setFiltered(res);
  }, [search, cat, sort, priceMax, books]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest">Explore Library</h3>
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
              <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none" placeholder="Find books..." />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Categories</p>
              <div className="space-y-1">
                {['All', ...CATEGORIES].map(c => (
                  <button key={c} onClick={() => setCat(c)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${cat === c ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm">
          <p className="text-slate-500 text-xs">Total results: <span className="font-bold text-slate-900">{filtered.length}</span></p>
          <select value={sort} onChange={e => setSort(e.target.value)} className="bg-transparent border-none text-xs font-bold outline-none cursor-pointer">
            <option value="latest">Sort: Recently Added</option>
            <option value="price-low">Sort: Price Low-High</option>
            <option value="price-high">Sort: Price High-Low</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(b => <BookCard key={b.id} book={b} />)}
        </div>
      </div>
    </div>
  );
};

export default Books;
