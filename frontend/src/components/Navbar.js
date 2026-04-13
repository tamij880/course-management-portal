// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // keeping your import style as-is

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* ✅ Changed brand name */}
        <Link className="navbar-brand" to="/">
          The Department Course Management Portal
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {/* Always show Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {token ? (
              <>
                {/* Student links */}
                {role === "student" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/materials">Materials</Link>
                    </li>
                  </>
                )}

                {/* Admin links */}
                {role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Panel</Link>
                  </li>
                )}

                {/* Logout for all logged-in users */}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Show Login/Register when logged out */}
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
