import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [token]);

  const toggleStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/users/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        accountStatus: status === "active" ? "banned" : "active",
      }),
    });

    setUsers(prev =>
      prev.map(u =>
        u._id === id
          ? { ...u, accountStatus: u.accountStatus === "active" ? "banned" : "active" }
          : u
      )
    );
  };

  return (
    <div className="dashboard-wrapper">
      <AdminSidebar />

      <div className="main-content">
        <h1>User Management</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.accountStatus}</td>
                <td>
                  <button onClick={() => toggleStatus(u._id, u.accountStatus)}>
                    {u.accountStatus === "active" ? "Ban" : "Unban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
