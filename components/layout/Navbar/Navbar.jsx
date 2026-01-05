import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  BookOpen,
  Heart,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin, isManager } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold font-serif text-slate-800 tracking-tight">
              Books
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/books"
              className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Browse
            </Link>
            {isAuthenticated && (
              <>
                {isManager && (
                  <Link
                    to="/manager"
                    className="text-slate-600 hover:text-indigo-600 font-medium"
                  >
                    Inventory
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-slate-600 hover:text-indigo-600 font-medium"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/orders"
                  className="text-slate-600 hover:text-indigo-600 font-medium"
                >
                  Orders
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/wishlist"
              className="p-2 text-slate-500 hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className="p-2 text-slate-500 hover:text-indigo-600 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-4 border-l">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-800">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-100"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link
            to="/books"
            className="block text-lg font-medium text-slate-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Catalog
          </Link>
          {isAuthenticated ? (
            <>
              {isManager && (
                <Link
                  to="/manager"
                  className="block text-lg font-medium text-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inventory Management
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block text-lg font-medium text-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/orders"
                className="block text-lg font-medium text-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="block text-lg font-medium text-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-lg font-medium text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-indigo-600 text-white text-center py-3 rounded-xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
