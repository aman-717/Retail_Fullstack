import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./SignUp.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if role is selected
    if (!role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4001/user/signup",
        {
          username,
          email,
          password,
          role, // Pass role as part of request
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message || "User Registered Successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole(""); // Reset role after successful signup
    } catch (error) {
      toast.error(error.response?.data?.message || "User registration failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Username"
              id="username"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
              id="email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              id="password"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <button type="submit" className="signup-button">
            Signup
          </button>
          <p className="login-link">
            Already have an account?{" "}
            <Link to="/Login" className="login-anchor">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
