import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../../../context/auth/AuthContext";
import { CartProvider } from "../../../context/cart/CartContext";
import { UserRole } from "../../../types";

import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { PrivateRoute } from "../../routes/PrivateRoute";

import { Home } from "../../../pages/sharedPages/Home/Home";
import { Books } from "../../../pages/sharedPages/Books/Books";
import { DetailsPage } from "../../../pages/sharedPages/BookDetails/BookDetails";
import { About } from "../../../pages/sharedPages/About/About";
import { Help } from "../../../pages/sharedPages/Help/Help";
import { Login } from "../../../pages/sharedPages/Login/Login";
import { Register } from "../../../pages/sharedPages/Register/Register";
import { OAuthCallback } from "../../../pages/sharedPages/OAuthCallback/OAuthCallback";
import { Cart } from "../../../pages/userPages/Cart/Cart";
import { Wishlist } from "../../../pages/userPages/Wishlist/Wishlist";
import { Checkout } from "../../../pages/userPages/Checkout/Checkout";
import { Orders } from "../../../pages/userPages/Orders/Orders";
import { Profile } from "../../../pages/userPages/Profile/Profile";
import { AdminDashboard } from "../../../pages/adminPages/AdminDashboard";
import { AdminReviewsPage } from "../../../pages/adminPages/AdminReviewsPage";
import { AdminUsersPage } from "../../../pages/adminPages/AdminUsersPage";
import { ManagerDashboard } from "../../../pages/managerPages/ManagerDashboard";

export const App = () => (
  <AuthProvider>
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<DetailsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute role={UserRole.ADMIN}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <PrivateRoute role={UserRole.ADMIN}>
                  <AdminReviewsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute role={UserRole.ADMIN}>
                  <AdminUsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager"
              element={
                <PrivateRoute role={UserRole.MANAGER}>
                  <ManagerDashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  </AuthProvider>
);
