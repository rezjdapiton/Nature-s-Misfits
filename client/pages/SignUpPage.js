import React, { useState } from "react";
import API from "../api";

export default function SignUp() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await API.post("/auth/register", form);
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                /><br/><br/>

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

                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}