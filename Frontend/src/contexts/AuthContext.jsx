import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuthStatus = async () => {
    try {
      const res = await api.get("/auth/me")
      console.log("User data fetched successfully:", res.data.user)
      setUser(res.data.user) // will be null if unauthorized
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const login = async (emailId, password) => {
    try {
      const response = await api.post('/auth/login', { emailId, password })
      setUser(response.data)
      toast.success('Login successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData)
      toast.success('Account created successfully! Please login.')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      toast.error(message)
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
      toast.success('Logged out successfully!')
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
    }
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
