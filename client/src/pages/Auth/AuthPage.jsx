import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ---------------- SIGN UP ----------------
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: signupData.name,
          email: signupData.email,
          password: signupData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful. Please log in.");
        setRightPanelActive(false); // 🔁 switch back to login
      } else {
        alert(data.message);
      }
    } catch {
      alert("Registration failed");
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`container ${rightPanelActive ? "right-panel-active" : ""}`}>

        {/* ---------- SIGN UP ---------- */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="Full name"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* ---------- SIGN IN ---------- */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Log In</h1>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />

            <button type="submit">Log In</button>
          </form>
        </div>

        {/* ---------- OVERLAY TOGGLE ---------- */}
        <div className="overlay-container">
          <div className="overlay">

            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(false)}
              >
                Log In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Don't have an account yet?</p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
