import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { bookService } from "../../../services/BookService";
import { categoryService } from "../../../services/CategoryService";
import { wishlistService } from "../../../services/WishlistService";
import { BookCard } from "../../../components/book/BookCard/BookCard";
import { useAuth } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("latest");
  const [priceMax, setPriceMax] = useState(200);
  const [wishlistIds, setWishlistIds] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    bookService.getBooks().then((b) => {
      setBooks(b);
      setFiltered(b);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let isActive = true;
    categoryService
      .getCategories()
      .then((data) => {
        if (isActive) setCategories(data);
      })
      .catch(() => {
        if (isActive) setCategories([]);
      });
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let res = books.filter(
      (b) =>
        (b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())) &&
        (cat === "All" || b.categories.includes(cat)) &&
        b.price <= priceMax
    );
    if (sort === "price-low") res.sort((a, b) => a.price - b.price);
    if (sort === "price-high") res.sort((a, b) => b.price - a.price);
    if (sort === "rating")
      res.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setFiltered(res);
  }, [search, cat, sort, priceMax, books]);

  useEffect(() => {
    let isActive = true;
    const loadWishlist = async () => {
      if (!user) {
        setWishlistIds([]);
        return;
      }
      const ids = await wishlistService.getWishlist(user.id);
      if (isActive) setWishlistIds(ids);
    };
    loadWishlist();
    return () => {
      isActive = false;
    };
  }, [user]);

  const handleToggleWishlist = async (bookId) => {
    if (!user) {
      if (confirm("Sign in to save items to your wishlist?")) {
        navigate("/login");
      }
      return;
    }
    const next = await wishlistService.toggleWishlist(user.id, bookId);
    setWishlistIds(next);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-12 flex flex-col gap-8 md:flex-row">
      <aside className="w-full md:w-[260px] md:shrink-0">
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
          <h3 className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-800 mb-6">
            Explore Library
          </h3>
          <div className="grid gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[14px] bg-slate-50 text-sm outline-none"
                placeholder="Find books..."
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-400 mb-3">
                Categories
              </p>
              <div className="grid gap-1.5">
                {["All", ...categories].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`w-full text-left border-0 bg-transparent px-3 py-2 rounded-[12px] text-sm font-medium cursor-pointer transition ${
                      cat === c
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-none"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    type="button"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1">
        <div className="flex items-center justify-between bg-white border border-slate-100 rounded-[18px] p-4 mb-8 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
          <p className="text-xs text-slate-500">
            Total results:{" "}
            <span className="font-bold text-slate-900">{filtered.length}</span>
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent border-0 text-xs font-bold text-slate-800 outline-none cursor-pointer"
          >
            <option value="latest">Sort: Recently Added</option>
            <option value="price-low">Sort: Price Low-High</option>
            <option value="price-high">Sort: Price High-Low</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BookCard
              key={b.id}
              book={b}
              isWishlisted={wishlistIds.includes(b.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
