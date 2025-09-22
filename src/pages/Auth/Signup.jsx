import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Signup() {
  const { register, handleSubmit } = useForm()
  const { signup, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password)
      navigate("/dashboard")
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <>
      <style>{`
        .form-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          padding: 1rem;
        }
        .form-box {
          width: 100%;
          max-width: 420px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 2rem;
        }
        .form-title {
          font-size: 1.6rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        .form-group label {
          margin-bottom: 0.3rem;
          font-weight: 500;
          color: #374151;
        }
        .form-input {
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 0.6rem 0.8rem;
          font-size: 0.95rem;
        }
        .form-input:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 2px #bfdbfe;
        }
        .btn-primary {
          background: #2563eb;
          color: #fff;
          padding: 0.6rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: background 0.2s;
          width: 100%;
        }
        .btn-primary:hover {
          background: #1d4ed8;
        }
        .btn-secondary {
          border: 1px solid #d1d5db;
          background: #f9fafb;
          color: #374151;
          padding: 0.6rem;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s;
        }
        .btn-secondary:hover {
          background: #f3f4f6;
        }
        .form-footer {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #4b5563;
        }
        .form-footer a {
          color: #2563eb;
          text-decoration: none;
        }
        .form-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="form-container">
        <div className="form-box">
          <h2 className="form-title">Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter password"
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
          <div className="form-footer">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  )
}
