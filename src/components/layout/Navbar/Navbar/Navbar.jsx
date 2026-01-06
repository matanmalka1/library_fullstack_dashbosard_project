import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useAuth } from "../../../../context/auth/AuthContext";
import { useCart } from "../../../../context/cart/CartContext";
import { NavbarLinks } from "../NavbarLinks/NavbarLinks";
import { NavbarActions } from "../NavbarActions/NavbarActions";
import { NavbarMobileMenu } from "../NavbarMobileMenu/NavbarMobileMenu";

export const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin, isManager } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-slate-800 font-serif tracking-[-0.01em]">
              Books
            </span>
          </Link>

          <NavbarLinks
            isAuthenticated={isAuthenticated}
            isManager={isManager}
            isAdmin={isAdmin}
          />
          <NavbarActions
            isAuthenticated={isAuthenticated}
            user={user}
            totalItems={totalItems}
            onLogout={handleLogout}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden border-0 bg-transparent text-slate-600 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <NavbarMobileMenu
          isAuthenticated={isAuthenticated}
          isManager={isManager}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          onNavigate={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};
