// client/src/pages/ViewOrders.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ViewOrders() {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <h1>View Orders</h1>
        <p>This page will show orders you placed and orders placed for your products.</p>

        <div className="card">
          <p>Orders UI coming later — will show itemized order tables and statuses.</p>
        </div>
      </div>
    </div>
  );
}
