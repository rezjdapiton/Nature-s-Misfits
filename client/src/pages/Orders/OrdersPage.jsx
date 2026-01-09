// client/src/pages/Orders/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/dashboard.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed loading orders:", err);
      }
    }

    if (token) loadOrders();
  }, [token]);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ₱{order.totalAmount}</p>

              <div className="product-grid">
                {order.items.map((item, idx) => (
                  <div className="product-card" key={idx}>
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
