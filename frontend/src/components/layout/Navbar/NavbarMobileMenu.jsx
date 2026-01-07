import { Link } from "react-router-dom";

export const NavbarMobileMenu = ({
  isAuthenticated,
  isManager,
  isAdmin,
  onLogout,
  onNavigate,
}) => (
  <div className="flex flex-col gap-4 px-4 py-6 bg-white border-b border-slate-200 animate-[navbar-slide-in_0.25s_ease]">
    <Link
      to="/books"
      className="text-slate-700 no-underline text-lg font-medium"
      onClick={onNavigate}
    >
      Browse Catalog
    </Link>
    {isAuthenticated ? (
      <>
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
          <Link
            to="/admin"
            className="text-slate-700 no-underline text-lg font-medium"
            onClick={onNavigate}
          >
            Admin Panel
          </Link>
        )}
        <Link
          to="/orders"
          className="text-slate-700 no-underline text-lg font-medium"
          onClick={onNavigate}
        >
          My Orders
        </Link>
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
  </div>
);
