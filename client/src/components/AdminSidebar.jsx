import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">

        <NavLink to="/admin/dashboard" className="pill">
          User Management
        </NavLink>

        <button
          className="pill logout-pill"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/auth";
          }}
        >
          Log Out
        </button>

      </div>
    </aside>
  );
}
