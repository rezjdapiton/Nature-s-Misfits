import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed loading products:", err);
      }
    }

    loadProducts();
  }, []);

  // ---------------- ADD TO CART ----------------
  async function addToCart(productId) {
    if (!token) {
      alert("Please log in first");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          productId,
          quantity: 1
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Added to cart!");
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Network error");
    }
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <h1>Marketplace</h1>
        <p>Here are all the available products:</p>

        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((p) => (
              <div className="product-card" key={p._id}>
                <img
                  src={p.img ? `/assets/${p.img}` : "/assets/placeholder.png"}
                  alt={p.title}
                />

                <div className="product-details">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <p className="price">₱{p.price}</p>
                  <p><em>Qty: {p.quantity} kg</em></p>
                </div>

                <button
                  className="add-btn"
                  onClick={() => addToCart(p._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
