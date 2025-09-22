import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm()
  const { resetPassword } = useAuth()

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email)
      alert('Check your email for a reset link')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Reset password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...register('email')} placeholder="Email" />
        <button className="btn" type="submit">Send reset email</button>
      </form>
    </div>
  )
}
