
import React from 'react';

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white font-serif text-2xl mb-6">Books</h3>
          <p className="text-sm leading-relaxed max-w-md">
            The world's premier digital sanctuary for literary explorers. We curate more than just books; we curate experiences.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Our Story</a></li>
            <li><a href="#" className="hover:text-indigo-400">Latest Collections</a></li>
            <li><a href="#" className="hover:text-indigo-400">Membership</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Connect</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
        <p>&copy; {currentYear} Books Global</p>
        <p>Verified Secure Bookstore</p>
      </div>
    </footer>
  );
};

export default MainFooter;
