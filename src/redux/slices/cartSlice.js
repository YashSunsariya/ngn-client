import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/public/cart')
      return data.data || data.cart || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch cart')
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/public/cart', { productId, quantity })
      return data.data || data.cart || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add to cart')
    }
  }
)

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/public/cart/${productId}`, { quantity })
      return data.data || data.cart || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update quantity')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/public/cart/${productId}`)
      return data.data || data.cart || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove item')
    }
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/public/cart')
      return []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to clear cart')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCartError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true
      state.error = null
    }
    const handleFulfilled = (state, action) => {
      state.loading = false
      const payload = action.payload
      if (Array.isArray(payload)) {
        state.items = payload
      } else if (payload && Array.isArray(payload.items)) {
        state.items = payload.items
      } else {
        state.items = []
      }
    }
    const handleRejected = (state, action) => {
      state.loading = false
      state.error = action.payload
    }

    builder
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, handleFulfilled)
      .addCase(fetchCart.rejected, handleRejected)
      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, handleFulfilled)
      .addCase(addToCart.rejected, handleRejected)
      .addCase(updateQuantity.pending, handlePending)
      .addCase(updateQuantity.fulfilled, handleFulfilled)
      .addCase(updateQuantity.rejected, handleRejected)
      .addCase(removeFromCart.pending, handlePending)
      .addCase(removeFromCart.fulfilled, handleFulfilled)
      .addCase(removeFromCart.rejected, handleRejected)
      .addCase(clearCart.pending, handlePending)
      .addCase(clearCart.fulfilled, handleFulfilled)
      .addCase(clearCart.rejected, handleRejected)
  },
})

export const { clearCartError } = cartSlice.actions
export default cartSlice.reducer
