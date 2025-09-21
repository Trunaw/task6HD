import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* Greeting */}
      <h1 className="text-2xl font-bold mb-6">
        {user ? `Welcome back, ${user.email}` : 'Welcome to your Dashboard'}
      </h1>

      {/* Profile Card */}
      {user && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2">Your Profile</h2>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>User ID:</strong> {user.uid}
          </p>
          <button
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

      <p className="text-gray-600 mb-6">
        This is your personal dashboard where you can manage your tutorials and
        projects.
      </p>

      {/* Example dashboard sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-700">My Tutorials</h2>
          <p className="text-sm text-gray-600 mt-1">
            Upload and view your demo videos in the Tutorials section.
          </p>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="font-semibold text-green-700">My Projects</h2>
          <p className="text-sm text-gray-600 mt-1">
            Browse and contribute to available projects in the marketplace.
          </p>
        </div>
      </div>
    </div>
  )
}
