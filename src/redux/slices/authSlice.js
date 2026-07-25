import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

const STORAGE_KEY = 'client_auth'

const readStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

const writeStorage = (auth) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
}

const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY)
}

const normalizeAuth = (payload) => {
  const { token, ...user } = payload
  return { user, token }
}

const stored = readStorage()

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/user/login', { email, password })
      return normalizeAuth(data.data || data)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed. Please try again.')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, contact, address, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/user/register', { name, email, contact, address, password })
      return normalizeAuth(data.data || data)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: stored?.user || null,
    token: stored?.token || null,
    isAuthenticated: Boolean(stored?.token),
    loading: false,
    error: null,
  },
  reducers: {
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload }
      writeStorage({ user: state.user, token: state.token })
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      clearStorage()
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        writeStorage(action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        writeStorage(action.payload)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { updateUser, logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
