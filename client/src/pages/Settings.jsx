// client/src/pages/Settings.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Settings() {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <h1>Settings</h1>
        <p>Placeholder. Settings UI will be implemented later.</p>
      </div>
    </div>
  );
}
