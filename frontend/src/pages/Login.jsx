// frontend/src/pages/Login.jsx

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'
import api from '../services/api'

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const res = await api.post('/auth/login', form)

      localStorage.setItem('token', res.data.token)

      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Data Analytics
            </h1>

            <p className="text-sm text-slate-400">
              Sign in to continue
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white border rounded-xl bg-slate-800 border-slate-700 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white border rounded-xl bg-slate-800 border-slate-700 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-400">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}