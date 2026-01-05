import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../../../context/auth/AuthContext";
import { CartProvider } from "../../../context/cart/CartContext";
import { UserRole } from "../../../types";

import { Navbar } from "../Navbar/Navbar";
import { MainFooter } from "../MainFooter/MainFooter";
import { PrivateRoute } from "../../routes/PrivateRoute";

import { Home } from "../../../pages/Home/Home";
import { Books } from "../../../pages/Books/Books";
import { DetailsPage } from "../../../pages/BookDetails/BookDetails";
import { Login } from "../../../pages/Login/Login";
import { Register } from "../../../pages/Register/Register";
import { Cart } from "../../../pages/Cart/Cart";
import { Wishlist } from "../../../pages/Wishlist/Wishlist";
import { Checkout } from "../../../pages/Checkout/Checkout";
import { Orders } from "../../../pages/Orders/Orders";
import { AdminDashboard } from "../../../pages/AdminDashboard/AdminDashboard";
import { ManagerDashboard } from "../../../pages/ManagerDashboard/ManagerDashboard";
import "./Routing.css";

export const App = () => (
  <AuthProvider>
    <CartProvider>
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<DetailsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
        <MainFooter />
      </div>
    </CartProvider>
  </AuthProvider>
);
