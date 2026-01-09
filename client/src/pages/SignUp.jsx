import { useState } from "react";
import { registerUser } from "../api/auth";
import { FaFacebookF, FaGooglePlusG, FaEnvelope } from "react-icons/fa";

<div className="social-container">
  <a className="social"><FaFacebookF /></a>
  <a className="social"><FaGooglePlusG /></a>
  <a className="social"><FaEnvelope /></a>
</div>

function SignUp() {
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
        const result = await registerUser(form);
        setMessage(result.message || "Something went wrong");
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial" }}>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>

                <label>Full Name</label><br />
                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label>Email</label><br />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label>Password</label><br />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                /><br /><br />

                <button type="submit">Register</button>
            </form>

            {message && (
                <p style={{ marginTop: "20px", color: "blue" }}>{message}</p>
            )}
        </div>
    );
}

export default SignUp;