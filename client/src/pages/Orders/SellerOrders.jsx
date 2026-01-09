import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/dashboard.css";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch(
          "http://localhost:5000/api/orders/seller",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load seller orders:", err);
      }
    }

    if (token) loadOrders();
  }, [token]);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-content">
        <Topbar />

        <h1>Orders for My Products</h1>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map(order => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total Order Amount:</strong> ₱{order.totalAmount}</p>

              <div className="product-grid">
                {order.items.map((item, index) => (
                  <div className="product-card" key={index}>
                    <img
                      src={
                        item.img
                          ? `/assets/${item.img}`
                          : "/assets/placeholder.png"
                      }
                      alt={item.title}
                    />
                    <div className="product-details">
                      <h4>{item.title}</h4>
                      <p>
                        ₱{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
