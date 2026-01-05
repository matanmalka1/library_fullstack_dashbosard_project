
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, AlertCircle } from 'lucide-react';
import { Book } from '../../types';
import { useCart } from '../../context/CartContext';

interface BookCardProps {
  book: Book;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isWishlisted, onToggleWishlist }) => {
  const { addToCart } = useCart();

  const isLowStock = book.stockQuantity > 0 && book.stockQuantity <= 5;
  const isOutOfStock = book.stockQuantity === 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link to={`/books/${book.id}`}>
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => onToggleWishlist?.(book.id)}
            className={`p-2 rounded-full shadow-lg ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-slate-400 hover:text-red-500'}`}
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-full font-bold text-slate-900 text-sm shadow-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-slate-700">{book.rating || 'New'}</span>
          <span className="text-slate-300 mx-1">•</span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {book.categories[0]}
          </span>
        </div>

        <Link to={`/books/${book.id}`} className="block mb-1">
          <h3 className="font-bold text-slate-800 text-lg leading-tight line-clamp-2 hover:text-indigo-600 transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm font-medium mb-3">{book.author}</p>
        
        {isLowStock && (
          <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full w-fit">
            <AlertCircle className="w-3.5 h-3.5" />
            Only {book.stockQuantity} left!
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${book.price.toFixed(2)}</span>
          {!isOutOfStock && (
            <button 
              onClick={() => addToCart(book)}
              className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
