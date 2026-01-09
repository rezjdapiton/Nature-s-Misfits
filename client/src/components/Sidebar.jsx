// client/src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">

        {/* ---------------- USER ---------------- */}
        <NavLink to="/dashboard" className="pill">
          Dashboard
        </NavLink>

        <NavLink to="/my-listings" className="pill">
          My Listings
        </NavLink>

        <NavLink to="/cart" className="pill">
          Cart
        </NavLink>

        <NavLink to="/orders" className="pill">
          My Orders
        </NavLink>

        {/* ---------------- SELLER ---------------- */}
        <NavLink to="/seller-orders" className="pill">
          Seller Orders
        </NavLink>

        {/* ---------------- LOG OUT ---------------- */}
        <button
          className="pill logout-pill"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/auth";
          }}
        >
          Log Out
        </button>

      </div>
    </aside>
  );
}
