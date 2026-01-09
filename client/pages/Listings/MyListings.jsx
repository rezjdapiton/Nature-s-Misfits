// client/src/pages/Listings/MyListings.jsx

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/dashboard.css";

export default function MyListings() {
  const [listings, setListings] = useState([]);

  const token = localStorage.getItem("token");

  // ---------------------------------------
  // useEffect (correct async pattern)
  // ---------------------------------------
  useEffect(() => {
    if (!token) {
      console.log("❌ No token found, redirecting...");
      window.location.href = "/auth";
      return;
    }

    async function loadListings() {
      try {
        const res = await fetch("http://localhost:5000/api/products/my-listings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          console.log("❌ Unauthorized — token invalid");
          window.location.href = "/auth";
          return;
        }

        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Failed to load listings:", error);
      }
    }

    loadListings(); // safe and clean

  }, [token]); // reruns only if token changes

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <h1>My Listings</h1>

        <button
          className="add-btn"
          style={{ marginBottom: "20px", width: "200px" }}
          onClick={() => (window.location.href = "/add-product")}
        >
          ➕ Add Product
        </button>

        <div className="product-grid">
          {listings.length === 0 ? (
            <p>You have no listings yet.</p>
          ) : (
            listings.map((item) => (
              <div className="product-card" key={item._id}>
                <img
                  src={
                    item.img
                      ? `/assets/${item.img}`
                      : "/assets/placeholder.png"
                  }
                  alt={item.title}
                />
                <div className="product-details">
                  <h3>{item.title}</h3>
                  <p className="description">{item.description}</p>
                  <p className="price">₱{item.price}</p>
                  <p><em>Qty: {item.quantity} kg</em></p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
