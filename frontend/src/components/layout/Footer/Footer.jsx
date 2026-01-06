export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-900 text-slate-400 py-16 px-4">
      <div className="max-w-[1120px] mx-auto grid grid-cols-1 gap-12 text-left md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-serif text-white text-2xl mb-6">Books</h3>
          <p className="text-sm leading-7 max-w-[520px]">
            The world's premier digital sanctuary for literary explorers. We curate more than just books; we curate experiences.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.18em] mb-6">Navigation</h4>
          <ul className="list-none p-0 m-0 grid gap-3 text-sm">
            <li><a href="#" className="text-inherit no-underline transition-colors hover:text-indigo-300">Our Story</a></li>
            <li><a href="#" className="text-inherit no-underline transition-colors hover:text-indigo-300">Latest Collections</a></li>
            <li><a href="#" className="text-inherit no-underline transition-colors hover:text-indigo-300">Membership</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.18em] mb-6">Connect</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 rounded-xl bg-slate-800 text-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
            />
            <button className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-[13px] font-bold cursor-pointer transition-colors hover:bg-indigo-700">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-[1120px] mx-auto mt-12 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] font-bold">
        <p>&copy; {currentYear} Books Global</p>
        <p>Verified Secure Bookstore</p>
      </div>
    </footer>
  );
};
