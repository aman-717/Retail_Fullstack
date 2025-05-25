import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Login.css";
function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4001/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message || "User Logged in Successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.error || "User login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              id="email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              id="password"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="signup-link">
            New user?{" "}
            <Link to="/Signup" className="signup-anchor">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
