import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/Auth/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyListings from "./pages/Listings/MyListings";
import AddProduct from "./pages/Listings/AddProduct";
import CartPage from "./pages/Cart/CartPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import SellerOrders from "./pages/Orders/SellerOrders";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/auth" element={<AuthPage />} />

        {/* USER */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/my-listings" element={
          <ProtectedRoute><MyListings /></ProtectedRoute>
        } />

        <Route path="/add-product" element={
          <ProtectedRoute><AddProduct /></ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute><CartPage /></ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute><OrdersPage /></ProtectedRoute>
        } />

        {/* SELLER */}
        <Route path="/seller-orders" element={
          <ProtectedRoute><SellerOrders /></ProtectedRoute>
        } />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
