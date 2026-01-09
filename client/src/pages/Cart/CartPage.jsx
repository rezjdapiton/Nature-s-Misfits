import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/dashboard.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  // --------------------------------------------------
  // LOAD CART ITEMS
  // --------------------------------------------------
  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // ✅ Cart items are stored in data.items
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    }

    if (token) loadCart();
  }, [token]);

  // --------------------------------------------------
  // CALCULATE TOTAL (SAFE)
  // --------------------------------------------------
  const total = cartItems.reduce((sum, item) => {
    if (!item.productId) return sum;
    return sum + item.productId.price * item.quantity;
  }, 0);

  // --------------------------------------------------
  // CHECKOUT HANDLER
  // --------------------------------------------------
  async function handleCheckout() {
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Purchase successful!");
        // ✅ Redirect to Orders page
        window.location.href = "/orders";
      } else {
        alert(data.message || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Network error during checkout");
    }
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <h1>My Cart</h1>
        <p>Items you added to your cart:</p>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="product-grid">
              {cartItems.map((item) => (
                <div className="product-card" key={item._id}>
                  <img
                    src={
                      item.productId?.img
                        ? `/assets/${item.productId.img}`
                        : "/assets/placeholder.png"
                    }
                    alt={item.productId?.title || "Product"}
                  />

                  <div className="product-details">
                    <h3>{item.productId?.title}</h3>
                    <p className="price">
                      ₱{item.productId?.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ marginTop: "20px" }}>
              Total: ₱{total.toFixed(2)}
            </h2>

            <button
              className="add-btn"
              style={{ width: "250px", marginTop: "15px" }}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
