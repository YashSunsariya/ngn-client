import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/public/categories')
      return data.data || data.categories || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories')
    }
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategories(state) {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCategories } = categorySlice.actions
export default categorySlice.reducer
