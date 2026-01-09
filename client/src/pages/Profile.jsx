// client/src/pages/Profile.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Profile() {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <h1>Profile</h1>
        <p>Profile editing will be added later.</p>
      </div>
    </div>
  );
}
