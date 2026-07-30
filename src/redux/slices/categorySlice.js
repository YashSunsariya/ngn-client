import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "../../services/categoryService";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const result = await categoryService.fetchCategories();
      return result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCategories(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
