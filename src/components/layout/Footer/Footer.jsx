
import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center">
      <div className="max-w-[1120px] mx-auto mb-8 grid grid-cols-1 gap-8 text-left md:grid-cols-3">
        <div>
          <h3 className="font-serif text-white text-xl mb-4">Books</h3>
          <p className="text-sm leading-6">
            Bringing the finest literature to your doorstep. Explore our curated selection of global bestsellers.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="list-none p-0 m-0 grid gap-2 text-sm">
            <li><a href="#" className="text-inherit no-underline transition-colors hover:text-indigo-300">About Us</a></li>
            <li><a href="#" className="text-inherit no-underline transition-colors hover:text-indigo-300">Privacy Policy</a></li>
            <li><a href="#" className="text-inherit no-underline transition-colors hover:text-indigo-300">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Newsletter</h4>
          <p className="text-sm leading-6 mb-4">Get updates on new arrivals and special offers.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 rounded-xl px-4 py-2 bg-slate-800 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
            />
            <button className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-[13px] font-bold cursor-pointer">Join</button>
          </div>
        </div>
      </div>
      <p className="text-xs m-0">&copy; {currentYear} Books. All rights reserved.</p>
    </footer>
  );
};
