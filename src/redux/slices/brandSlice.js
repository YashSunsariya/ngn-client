import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { brandService } from "../../services/brandService";

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const result = await brandService.fetchBrands();
      return result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch brands"
      );
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBrands(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearBrands } = brandSlice.actions;
export default brandSlice.reducer;
