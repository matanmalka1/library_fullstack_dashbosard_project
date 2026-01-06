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
import "./Navbar.css";

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
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__row">
          <Link to="/" className="navbar__brand">
            <BookOpen className="navbar__brand-icon" />
            <span className="navbar__brand-text">
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
            className="navbar__menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="navbar__menu-icon" />
            ) : (
              <Menu className="navbar__menu-icon" />
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
