
import React, { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { Book } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ReviewSection = ({ book, onUpdate }: { book: Book, onUpdate: () => void }) => {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const approved = book.reviews.filter(r => r.approved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment) return;
    await api.addReview(book.id, { userId: user.id, userName: user.name, rating, comment, date: new Date().toISOString() });
    setComment('');
    alert('Review submitted for approval!');
    onUpdate();
  };

  return (
    <div className="flex flex-col md:flex-row gap-16">
      <div className="w-full md:w-1/3">
        <h2 className="text-3xl font-serif font-bold mb-6">Insights</h2>
        <div className="bg-slate-50 p-8 rounded-3xl border">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl font-bold">{book.rating || 0}</span>
            <div className="flex flex-col">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= (book.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}</div>
              <span className="text-xs text-slate-500">{approved.length} reviews</span>
            </div>
          </div>
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-1 mb-2">{[1,2,3,4,5].map(i => <button key={i} type="button" onClick={() => setRating(i)}><Star className={`w-5 h-5 ${i <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} /></button>)}</div>
              <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full p-4 bg-white border rounded-2xl text-sm min-h-[120px] outline-none" placeholder="Your thoughts..." />
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Submit Review</button>
            </form>
          ) : <p className="text-sm text-slate-400 text-center py-4">Sign in to leave a review.</p>}
        </div>
      </div>
      <div className="flex-grow space-y-6">
        {approved.length ? approved.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-3xl border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center font-bold text-indigo-600 uppercase">{r.userName[0]}</div>
                <div><h4 className="font-bold text-sm">{r.userName}</h4><div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className={`w-2.5 h-2.5 ${i <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}</div></div>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(r.date).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-600 italic text-sm">"{r.comment}"</p>
          </div>
        )) : <div className="text-center py-12"><MessageCircle className="w-12 h-12 text-slate-200 mx-auto mb-2" /><p className="text-slate-400 font-bold">No verified reviews yet.</p></div>}
      </div>
    </div>
  );
};

export default ReviewSection;
