import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoryService } from "../../../services/CategoryService";

export const NavbarMobileMenu = ({
  isAuthenticated,
  isManager,
  isAdmin,
  onLogout,
  onNavigate,
}) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const handleCategoryChange = (value) => {
    if (!value || value === "all") {
      navigate("/books");
    } else {
      navigate(`/books?category=${encodeURIComponent(value)}`);
    }
    onNavigate();
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6 bg-white border-b border-slate-200 animate-[navbar-slide-in_0.25s_ease]">
      <Link
        to="/books"
        className="text-slate-700 no-underline text-lg font-medium"
        onClick={onNavigate}
      >
        Browse Catalog
      </Link>
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="text-slate-700 text-lg font-medium bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-3 outline-none"
        defaultValue="all"
      >
        <option value="all">Browse by Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {isAuthenticated ? (
        <>
          <Link
            to="/orders"
            className="text-slate-700 no-underline text-lg font-medium"
            onClick={onNavigate}
          >
            Orders
          </Link>
          {isManager && (
            <Link
              to="/manager"
              className="text-slate-700 no-underline text-lg font-medium"
              onClick={onNavigate}
            >
              Inventory Management
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                to="/admin/reviews"
                className="text-slate-700 no-underline text-lg font-medium"
                onClick={onNavigate}
              >
                Pending
              </Link>
              <Link
                to="/admin/users"
                className="text-slate-700 no-underline text-lg font-medium"
                onClick={onNavigate}
              >
                User Controls
              </Link>
            </>
          )}
          <Link
            to="/wishlist"
            className="text-slate-700 no-underline text-lg font-medium"
            onClick={onNavigate}
          >
            Wishlist
          </Link>
          <button
            onClick={onLogout}
            className="border-0 bg-transparent text-red-600 text-lg font-semibold text-left cursor-pointer p-0"
            type="button"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="no-underline bg-indigo-600 text-white text-center py-3 px-4 rounded-[14px] font-semibold"
          onClick={onNavigate}
        >
          Sign In
        </Link>
      )}
      <Link
        to="/about"
        className="text-slate-700 no-underline text-lg font-medium"
        onClick={onNavigate}
      >
        About
      </Link>
      <Link
        to="/help"
        className="text-slate-700 no-underline text-lg font-medium"
        onClick={onNavigate}
      >
        Help
      </Link>
    </div>
  );
};
