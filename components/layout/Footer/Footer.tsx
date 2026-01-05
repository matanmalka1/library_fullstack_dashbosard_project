
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
        <div>
          <h3 className="text-white font-serif text-xl mb-4">Books</h3>
          <p className="text-sm">
            Bringing the finest literature to your doorstep. Explore our curated selection of global bestsellers.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Get updates on new arrivals and special offers.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-indigo-500" 
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
      <p className="text-xs">&copy; {currentYear} Books. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
