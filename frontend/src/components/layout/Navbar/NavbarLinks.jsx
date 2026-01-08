import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoryService } from "../../../services/CategoryService";

export const NavbarLinks = ({ isAuthenticated, isManager, isAdmin }) => {
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
      return;
    }
    navigate(`/books?category=${encodeURIComponent(value)}`);
  };

  return (
    <div className="hidden md:flex items-center gap-8">
      <Link to="/books" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
        Browse
      </Link>
      <div className="relative">
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="text-slate-600 font-medium bg-transparent border-0 outline-none cursor-pointer hover:text-indigo-600"
          defaultValue="all"
        >
          <option value="all">Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
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
