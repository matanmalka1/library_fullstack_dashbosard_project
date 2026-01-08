import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoryService } from "../../../services/CategoryService";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export const NavbarLinks = ({ isAuthenticated, isManager, isAdmin }) => {
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
      return;
    }
    navigate(`/books?category=${encodeURIComponent(value)}`);
  };

  return (
    <div className="hidden md:flex items-center gap-8">
      <Link to="/books" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
        Browse
      </Link>
      <Select.Root value={selectedCategory} onValueChange={handleCategoryChange}>
        <Select.Trigger className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none cursor-pointer transition hover:border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300">
          <Select.Value placeholder="Categories" />
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
      {isAuthenticated && (
        <>
          <Link to="/orders" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
            Orders
          </Link>
          {isManager && (
            <Link to="/manager" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
              Inventory
            </Link>
          )}
          {isAdmin && (
            <>
              <Link to="/admin/reviews" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
                Reviews
              </Link>
              <Link to="/admin/users" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
                User Controls
              </Link>
            </>
          )}
        </>
      )}
      <Link to="/about" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
        About
      </Link>
      <Link to="/help" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
        Help
      </Link>
    </div>
  );
};
