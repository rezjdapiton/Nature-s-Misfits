// client/src/pages/MyListings.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MyListings() {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <h1>My Listings</h1>
        <p>Manage your products here. (Add Product button below opens a simple form placeholder.)</p>

        <div className="card">
          <h3>Add Product (placeholder)</h3>
          <p>This will open the Add Product form in a future iteration.</p>
          <button className="pill" onClick={() => alert("Add Product UI coming soon")}>Add Product</button>
        </div>
      </div>
    </div>
  );
}
