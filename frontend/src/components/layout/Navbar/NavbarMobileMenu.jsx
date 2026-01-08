import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoryService } from "../../../services/CategoryService";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export const NavbarMobileMenu = ({
  isAuthenticated,
  isManager,
  isAdmin,
  onLogout,
  onNavigate,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
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
    setSelectedCategory(value);
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
      <Select.Root value={selectedCategory} onValueChange={handleCategoryChange}>
        <Select.Trigger className="inline-flex items-center justify-between gap-2 text-slate-700 text-lg font-medium bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300">
          <Select.Value placeholder="Browse by Category" />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-50 bg-white border border-slate-200 rounded-xl shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden">
            <Select.Viewport className="p-2">
              <Select.Item
                value="all"
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 cursor-pointer outline-none data-[highlighted]:bg-slate-50 data-[state=checked]:font-semibold"
              >
                <Select.ItemText>All Categories</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="w-4 h-4 text-indigo-600" />
                </Select.ItemIndicator>
              </Select.Item>
              {categories.map((category) => (
                <Select.Item
                  key={category}
                  value={category}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 cursor-pointer outline-none data-[highlighted]:bg-slate-50 data-[state=checked]:font-semibold"
                >
                  <Select.ItemText>{category}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="w-4 h-4 text-indigo-600" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
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
