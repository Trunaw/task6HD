import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { user, logout, loading } = useAuth()

  return (
    <>
      {/* Inline CSS inside the same file */}
      <style>{`
        .navbar {
          background: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-links a {
          text-decoration: none;
          color: #444;
          transition: color 0.2s ease;
        }

        .nav-links a:hover {
          color: #007bff;
        }

        .brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: #007bff;
        }

        .auth-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .loading {
          color: gray;
          font-size: 0.9rem;
        }

        .user-info {
          font-size: 0.9rem;
          color: #555;
        }

        .email {
          font-weight: bold;
        }

        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          border: none;
        }

        .login-btn {
          background: #007bff;
          color: #fff;
        }
        .login-btn:hover {
          background: #0056b3;
        }

        .signup-btn {
          border: 1px solid #007bff;
          color: #007bff;
          background: transparent;
        }
        .signup-btn:hover {
          background: #e6f0ff;
        }

        .logout-btn {
          background: #dc3545;
          color: #fff;
        }
        .logout-btn:hover {
          background: #b52a37;
        }
      `}</style>

      {/* JSX for Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="brand">DEV@Deakin</Link>
          </li>
          <li>
            <Link to="/tutorials">Tutorials</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          {user && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>

        <div className="auth-actions">
          {loading ? (
            <span className="loading">Checking login...</span>
          ) : user ? (
            <>
              <div className="user-info">
                Logged in as <span className="email">{user.email}</span>
              </div>
              <button className="btn logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </>
  )
}
