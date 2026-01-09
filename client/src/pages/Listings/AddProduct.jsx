// client/src/pages/Listings/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    img: "",
  });

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added!");
        navigate("/my-listings"); // return to My Listings
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add New Product</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Title</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Description</label>
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Price (₱)</label>
        <input
          type="number"
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <label>Quantity (kg)</label>
        <input
          type="number"
          required
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <label>Image filename (e.g. carrot.jpg)</label>
        <input
          type="text"
          required
          value={form.img}
          onChange={(e) => setForm({ ...form, img: e.target.value })}
        />

        <button type="submit" style={{ marginTop: "15px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
}
