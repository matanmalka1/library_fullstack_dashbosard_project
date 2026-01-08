
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BookCard } from '../../../components/book/BookCard/BookCard';

export const HomeFeatured = ({ featuredBooks }) => (
  <section className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
      <div>
        <h2 className="font-serif text-2xl md:text-[32px] font-bold text-slate-900 mb-2">Featured Collection</h2>
        <p className="text-slate-500">
          Handpicked by our expert librarians this month.
        </p>
      </div>
      <Link to="/books" className="inline-flex items-center gap-1.5 text-indigo-600 font-bold no-underline transition-colors hover:text-indigo-700 group">
        View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>

    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {featuredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  </section>
);
