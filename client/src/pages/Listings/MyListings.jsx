import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ NEW
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/dashboard.css";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();   // ⭐ NEW

  // Fetch user listings
  useEffect(() => {
    async function loadListings() {
      try {
        const res = await fetch("http://localhost:5000/api/products/my-listings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔥 include token
          },
        });

        if (res.status === 401) {
          console.log("Unauthorized — token missing or invalid");
          return;
        }

        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to load listings:", err);
      }
    }

    if (token) loadListings();
  }, [token]);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <h1>My Listings</h1>
        <p>Your products for sale:</p>

        {/* ⭐ Step 3: Add Product button → goes to /add-product page */}
        <button
          className="add-btn"
          style={{ width: "200px", marginBottom: "20px" }}
          onClick={() => navigate("/add-product")}   // 🔥 Updated
        >
          + Add Product
        </button>

        <div className="product-grid">
          {listings.length === 0 ? (
            <p>You have no listings yet.</p>
          ) : (
            listings.map((p) => (
              <div className="product-card" key={p._id}>
                <img
                  src={p.img ? `/assets/${p.img}` : "/assets/placeholder.png"}
                  alt={p.title}
                />

                <div className="product-details">
                  <h3>{p.title}</h3>
                  <p className="description">{p.description}</p>
                  <p className="price">₱{p.price}</p>
                  <p><em>Qty: {p.quantity} kg</em></p>
                </div>

                <button className="add-btn">Edit Listing</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
