import { Link } from "react-router-dom";
import { ShoppingCart, Heart, LogOut, Settings } from "lucide-react";
import { normalizeRole } from "../../../services/shared/normalize";

export const NavbarActions = ({
  isAuthenticated,
  user,
  totalItems,
  onLogout,
}) => {
  const getInitials = (currentUser) => {
    if (!currentUser) return "";
    const first =
      currentUser.firstName?.[0] ||
      currentUser.name?.trim()?.split(" ")?.[0]?.[0] ||
      "";
    const last =
      currentUser.lastName?.[0] ||
      currentUser.name?.trim()?.split(" ")?.[1]?.[0] ||
      "";
    return `${first}${last}`.toUpperCase();
  };

  const initials = getInitials(user);
  const profilePicture = user?.profilePicture;

  return (
    <div className="hidden md:flex items-center gap-4">
      <Link to="/wishlist" className="relative p-2 text-slate-500 transition-colors hover:text-red-500">
        <Heart className="w-5 h-5" />
      </Link>
      <Link to="/cart" className="relative p-2 text-slate-500 transition-colors hover:text-indigo-600">
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
            {totalItems}
          </span>
        )}
      </Link>
      {isAuthenticated ? (
        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={user?.name || "Profile"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[11px] font-bold text-slate-600">
                {initials || "U"}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs font-semibold text-slate-800">{user?.name}</span>
            <span className="text-[10px] uppercase tracking-[0.08em] text-slate-400">
              {normalizeRole(user?.role)}
            </span>
          </div>
          <Link
            to="/profile"
            className="border-0 bg-transparent text-slate-500 cursor-pointer transition-colors hover:text-indigo-600 p-2 no-underline"
            title="Account Settings"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={onLogout}
            className="border-0 bg-transparent text-slate-500 cursor-pointer transition-colors hover:text-red-500 p-2"
            type="button"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="no-underline bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow-[0_8px_16px_rgba(79,70,229,0.18)] transition-colors hover:bg-indigo-700"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};
