import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, thunkAPI) => {
  try {
    const res = await api.get('/auth/me') // {withCredentials: true} is inherited from api.js
    return res.data.user
  } catch {
    return null
  }
})

export const login = createAsyncThunk('auth/login', async ({ emailId, password }, thunkAPI) => {
  try {
    // Explicit withCredentials set by api.js, so not required here
    const response = await api.post('/auth/login', { emailId, password })
    toast.success('Login successful!')
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed'
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/signup', userData)
    toast.success('Account created successfully! Please login.')
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'Signup failed'
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout')
    toast.success('Logged out successfully!')
    return null
  } catch (error) {
    toast.error('Logout error')
    return null
  }
})

const initialState = {
  user: null,
  loading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export default authSlice.reducer
export const selectUser = (state) => state.auth.user
export const selectAuthLoading = (state) => state.auth.loading
