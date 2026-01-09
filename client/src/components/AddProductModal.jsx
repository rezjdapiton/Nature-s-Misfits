import React, { useState } from "react";
import "../styles/myListings.css";

export default function AddProductModal({ close, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/products/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      refresh();
      close();
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Add New Product</h2>

        <form onSubmit={handleSubmit} className="modal-form">

          <input
            type="text"
            placeholder="Product Name"
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            required
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Quantity (kg)"
            required
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <input
            type="text"
            placeholder="Image filename (example: carrot.jpg)"
            required
            onChange={(e) => setForm({ ...form, img: e.target.value })}
          />

          <div className="modal-actions">
            <button type="button" onClick={close} className="cancel">
              Cancel
            </button>
            <button type="submit" className="save">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
