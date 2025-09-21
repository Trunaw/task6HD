import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Context
import { useAuth } from './contexts/AuthContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Tutorials from './pages/Tutorials/Tutorials'
import TutorialDetail from './pages/Tutorials/TutorialDetail'
import Projects from './pages/Projects/Projects'
import ProjectDetail from './pages/Projects/ProjectDetail'

// Components
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'   // ✅ import Navbar

export default function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Use the Navbar component */}
      <Navbar />

      {/* Main Content */}
      <main className="p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Tutorials */}
            <Route path="/tutorials" element={<Tutorials />} />

            <Route path="/tutorials/:id" element={<TutorialDetail />} />

            {/* Projects */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
