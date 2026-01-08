import { useEffect, useState } from "react";
import { Heart, Search, ArrowRight } from "lucide-react";
import { bookService } from "../../../services/BookService";
import { wishlistService } from "../../../services/WishlistService";
import { useAuth } from "../../../context/auth/AuthContext";
import { BookCard } from "../../../components/book/BookCard/BookCard";
import { EmptyState } from "../../../components/ui/EmptyState";
import { PageContainer } from "../../../components/layout/PageContainer";
import { Link } from "react-router-dom";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    const allBooks = await bookService.getBooks();
    const ids = await wishlistService.getWishlist(user.id);
    setWishlist(allBooks.filter((b) => ids.includes(b.id)));
    setLoading(false);
  };

  const handleToggle = async (id) => {
    if (user) {
      await wishlistService.toggleWishlist(user.id, id);
      fetchWishlist();
    }
  };

  if (loading)
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-20 flex justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );

  if (!user) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-32 text-center">
        <EmptyState
          icon={Heart}
          title="Save your favorites"
          description="Please sign in to keep track of books you'd like to read later."
          iconWrapperClassName="w-20 h-20 bg-slate-50 rounded-full"
          iconClassName="w-10 h-10 text-slate-200"
          titleClassName="text-slate-800"
          action={
            <Link
              to="/login"
              className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold no-underline shadow-[0_16px_30px_rgba(79,70,229,0.2)]"
            >
              Sign In
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <PageContainer className="py-12">
      <div className="flex items-center justify-between gap-6 mb-12 flex-wrap">
        <div>
          <h1 className="font-serif text-4xl text-slate-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-slate-500 m-0">Items you've saved for later.</p>
        </div>
        <Link
          to="/books"
          className="inline-flex items-center gap-1.5 text-indigo-600 font-bold no-underline group"
        >
          Keep Shopping{" "}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={true}
              onToggleWishlist={handleToggle}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[32px] px-8 py-20 text-center">
          <EmptyState
            icon={Search}
            title="Your wishlist is empty"
            description="Click the heart icon on any book to add it to your personal favorites collection."
            iconWrapperClassName="w-16 h-16 bg-slate-50 rounded-2xl"
            iconClassName="w-8 h-8 text-slate-200"
            titleClassName="text-xl text-slate-800 mb-2"
            descriptionClassName="max-w-[320px] mb-8"
            action={
              <Link
                to="/books"
                className="inline-block bg-slate-900 text-white px-8 py-3 rounded-[14px] font-bold no-underline"
              >
                Explore Catalog
              </Link>
            }
          />
        </div>
      )}
    </PageContainer>
  );
};
