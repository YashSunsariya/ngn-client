import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/public/products', { params })
      return data.data || data.products || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch products')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/public/products/${id}`)
      return data.data || data.product || data || null
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product')
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    current: null,
    loading: false,
    detailLoading: false,
    error: null,
  },
  reducers: {
    clearProducts(state) {
      state.items = []
      state.error = null
    },
    clearCurrentProduct(state) {
      state.current = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false
        state.current = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false
        state.error = action.payload
      })
  },
})

export const { clearProducts, clearCurrentProduct } = productSlice.actions
export default productSlice.reducer
