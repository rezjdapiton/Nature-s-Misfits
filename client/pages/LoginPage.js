import React, { useState } from "react";
import API from "../api";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);

            setMessage("Login successful!");
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}