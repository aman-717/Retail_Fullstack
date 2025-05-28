import React, { useState } from "react";
import "./dashboard.css"; // Make sure this file exists
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const navigate = useNavigate(); // Add this inside your component

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4001/user/logout"); // <-- Use actual logout API
      toast.success("Logged out successfully");
      localStorage.removeItem("token"); // Clear auth token if stored
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className={isDarkMode ? "dashboard dark" : "dashboard light"}>
      {/* Header */}
      <header className="header">
        <h1>Billing System</h1>
        <nav>
          <a href="#">ADMIN</a>
          <a href="#">CREATE BILL</a>
          <button className="logoutbutton" onClick={handleLogout}>
            LOGOUT
          </button>
          <button onClick={toggleTheme}>{isDarkMode ? "🌙" : "🌞"}</button>
        </nav>
      </header>

      {/* Sales Cards */}
      <div className="sales-cards">
        {["7 Days Sale", "1 Month Sale", "3 Months Sale"].map((label, idx) => (
          <div className="card" key={idx}>
            <div className="amount">₹ 0</div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bills Section */}
      <section className="recent-bills">
        <div className="filters">
          <h2>Recent Bills (0)</h2>
          <div className="filter-controls">
            <input type="date" />
            <select>
              <option>Bill By</option>
              <option>Admin</option>
              <option>Staff</option>
            </select>
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search by Customer Name or Bill No"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>BILL NO.</th>
                <th>CUSTOMER NAME</th>
                <th>MOBILE NO.</th>
                <th>DATE</th>
                <th>BILLED BY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="no-data">
                  No bills found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
