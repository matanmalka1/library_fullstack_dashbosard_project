
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '../../services/api';
import { BookCard } from '../../components/book/BookCard/BookCard';
import { CATEGORIES } from '../../Utils/constants';
import './Books.css';

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
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
    <div className="books">
      <aside className="books__sidebar">
        <div className="books__panel">
          <h3 className="books__panel-title">Explore Library</h3>
          <div className="books__panel-body">
            <div className="books__search">
              <Search className="books__search-icon" />
              <input value={search} onChange={e => setSearch(e.target.value)} className="books__search-input" placeholder="Find books..." />
            </div>
            <div>
              <p className="books__label">Categories</p>
              <div className="books__categories">
                {['All', ...CATEGORIES].map(c => (
                  <button key={c} onClick={() => setCat(c)} className={`books__category ${cat === c ? 'is-active' : ''}`}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="books__content">
        <div className="books__toolbar">
          <p className="books__results">Total results: <span className="books__results-count">{filtered.length}</span></p>
          <select value={sort} onChange={e => setSort(e.target.value)} className="books__sort">
            <option value="latest">Sort: Recently Added</option>
            <option value="price-low">Sort: Price Low-High</option>
            <option value="price-high">Sort: Price High-Low</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>
        <div className="books__grid">
          {filtered.map(b => <BookCard key={b.id} book={b} />)}
        </div>
      </div>
    </div>
  );
};
