import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { user, logout, loading } = useAuth()

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0">
      {/* Left side: Brand + Nav links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          DEV@Deakin
        </Link>

        <div className="flex gap-4">
          <Link
            to="/tutorials"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Tutorials
          </Link>
          <Link
            to="/projects"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Projects
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Right side: Auth state */}
      <div className="flex items-center gap-4">
        {loading ? (
          <span className="text-gray-500 text-sm">Checking login...</span>
        ) : user ? (
          <>
            {/* Show logged in user */}
            <div className="text-sm text-gray-600">
              Logged in as{" "}
              <span className="font-semibold">{user.email}</span>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
