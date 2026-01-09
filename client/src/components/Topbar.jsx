import React from "react";
import searchIcon from "../assets/search.svg";
import cartIcon from "../assets/cart.svg";
import chatIcon from "../assets/chat.svg";

export default function Topbar() {
  return (
    <div className="top-bar">
      <div className="welcome-text">Welcome!</div>

      <div className="right-section">

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search products…"
          />
          <img src={searchIcon} className="search-icon" alt="Search" />
        </div>

        <div className="top-icons">

          {/* ⭐ NEW: CART BUTTON → redirects to /cart */}
          <button
            className="icon-btn"
            onClick={() => (window.location.href = "/cart")}
          >
            <img src={cartIcon} alt="Cart" />
          </button>

          <button className="icon-btn">
            <img src={chatIcon} alt="Notifications" />
          </button>

        </div>
      </div>
    </div>
  );
}
