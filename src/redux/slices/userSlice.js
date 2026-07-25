import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/auth/user/me')
      return data.data || data.user || data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await api.put('/auth/user/profile', profileData)
      return data.data || data.user || data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update profile')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    saving: false,
    error: null,
  },
  reducers: {
    clearUser(state) {
      state.profile = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.saving = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.saving = false
        state.profile = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.saving = false
        state.error = action.payload
      })
  },
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer
