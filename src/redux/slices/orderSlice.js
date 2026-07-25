import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/public/orders', orderData)
      return data.data || data.order || data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create order')
    }
  }
)

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/public/orders')
      return data.data || data.orders || data || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError(state) {
      state.error = null
    },
    clearCurrentOrder(state) {
      state.currentOrder = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        const payload = action.payload
        if (Array.isArray(payload)) {
          state.orders = payload
        } else if (payload && Array.isArray(payload.items)) {
          state.orders = payload.items
        } else {
          state.orders = []
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions
export default orderSlice.reducer
