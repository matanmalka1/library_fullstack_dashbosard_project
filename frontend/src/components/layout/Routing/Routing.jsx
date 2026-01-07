import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../../../context/auth/AuthContext";
import { CartProvider } from "../../../context/cart/CartContext";
import { UserRole } from "../../../types";

import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { PrivateRoute } from "../../routes/PrivateRoute";

import { Home } from "../../../pages/Home/Home";
import { Books } from "../../../pages/Books/Books";
import { DetailsPage } from "../../../pages/BookDetails/BookDetails";
import { Login } from "../../../pages/Login/Login";
import { Register } from "../../../pages/Register/Register";
import { OAuthCallback } from "../../../pages/OAuthCallback/OAuthCallback";
import { Cart } from "../../../pages/Cart/Cart";
import { Wishlist } from "../../../pages/Wishlist/Wishlist";
import { Checkout } from "../../../pages/Checkout/Checkout";
import { Orders } from "../../../pages/Orders/Orders";
import { Profile } from "../../../pages/Profile/Profile";
import { AdminDashboard } from "../../../pages/AdminDashboard/AdminDashboard";
import { ManagerDashboard } from "../../../pages/ManagerDashboard/ManagerDashboard";

export const App = () => (
  <AuthProvider>
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
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
