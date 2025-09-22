import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // While Firebase is still checking
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 text-lg">Checking login status...</div>
      </div>
    )
  }

  // If no user, kick back to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If logged in, show the protected content
  return children
}
