import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/public/brands')
      return data.data || data.brands || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch brands')
    }
  }
)

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBrands(state) {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearBrands } = brandSlice.actions
export default brandSlice.reducer
