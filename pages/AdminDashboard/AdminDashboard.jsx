
import React, { useEffect, useState } from 'react';
import { Star, CheckCircle2, XCircle, Shield, User as UserIcon, MessageSquare, Book as BookIcon } from 'lucide-react';
import { UserRole } from '../../types';
import { api } from '../../services/api';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('reviews');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const b = await api.getBooks();
    setBooks(b);
    
    const pending = [];
    b.forEach(book => {
      book.reviews.forEach(review => {
        if (!review.approved) {
          pending.push({ bookId: book.id, bookTitle: book.title, review });
        }
      });
    });
    setPendingReviews(pending);
  };

  const handleApprove = async (bookId, reviewId) => {
    await api.approveReview(bookId, reviewId);
    fetchData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        {/* Left Nav */}
        <aside className="w-full md:w-64 border-r border-slate-50 p-8 space-y-2 flex-shrink-0">
          <h1 className="text-2xl font-serif font-bold text-slate-900 mb-10">Admin Control</h1>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'reviews' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <MessageSquare className="w-4 h-4" /> Pending Reviews
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Shield className="w-4 h-4" /> User Controls
          </button>
        </aside>

        {/* Main Area */}
        <main className="flex-grow p-8 bg-slate-50/30">
          {activeTab === 'reviews' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800">Review Moderation</h2>
                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{pendingReviews.length} Pending</span>
              </div>

              {pendingReviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {pendingReviews.map(({ bookId, bookTitle, review }) => (
                    <div key={review.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center font-bold text-indigo-600 uppercase">{review.userName.charAt(0)}</div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">{review.userName} <span className="text-slate-400 font-normal">on</span> <span className="text-indigo-600 italic">{bookTitle}</span></h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleApprove(bookId, review.id)}
                            className="bg-green-50 text-green-600 p-2 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm italic border-l-2 border-slate-100 pl-4">"{review.comment}"</p>
                      <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(review.date).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <CheckCircle2 className="w-16 h-16 text-green-100 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-400">Queue is empty. Great job!</h3>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-8">User Management</h2>
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Name & Email</th>
                      <th className="px-8 py-4">Role</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Admin User', email: 'admin@gmail.com', role: UserRole.ADMIN },
                      { name: 'Manager User', email: 'manager@gmail.com', role: UserRole.MANAGER },
                      { name: 'John Doe', email: 'user@gmail.com', role: UserRole.USER }
                    ].map((u, i) => (
                      <tr key={i} className="text-sm">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-800">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.role === UserRole.ADMIN ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="flex items-center gap-1.5 text-green-600 font-bold text-[10px]">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right font-bold text-indigo-600 hover:underline cursor-pointer">Edit Permissions</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
