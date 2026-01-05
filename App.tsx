import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { UserRole } from "./types";

import Navbar from "./components/layout/Navbar/Navbar";
import MainFooter from "./components/layout/MainFooter";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";

import HomePage from "./pages/Home/Home";
import BooksPage from "./pages/Books/Books";
import DetailsPage from "./pages/BookDetails/BookDetails";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import CartPage from "./pages/Cart/Cart";
import WishlistPage from "./pages/Wishlist/Wishlist";
import CheckoutPage from "./pages/Checkout/Checkout";
import OrdersPage from "./pages/Orders/Orders";
import AdminPage from "./pages/AdminDashboard/AdminDashboard";
import ManagerPage from "./pages/ManagerDashboard/ManagerDashboard";

const App = () => (
  <AuthProvider>
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<DetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrdersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute role={UserRole.ADMIN}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager"
              element={
                <PrivateRoute role={UserRole.MANAGER}>
                  <ManagerPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <MainFooter />
      </div>
    </CartProvider>
  </AuthProvider>
);

export default App;
