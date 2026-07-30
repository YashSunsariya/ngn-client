import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await productService.fetchProducts(params);
      return result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const result = await productService.fetchProductById(id);
      return result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    current: null,
    loading: false,
    detailLoading: false,
    error: null,
    success: false,
    pagination: {
      page: 1,
      totalPages: 1,
      totalItems: 0,
    },
  },
  reducers: {
    clearProducts(state) {
      state.items = [];
      state.error = null;
      state.success = false;
    },
    clearCurrentProduct(state) {
      state.current = null;
    },
    clearProductError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.items = payload;
          state.pagination.totalItems = payload.length;
          state.pagination.totalPages = Math.ceil(
            payload.length / 12
          );
        } else if (payload?.products) {
          state.items = payload.products;
          state.pagination = {
            page: payload.page || 1,
            totalPages: payload.totalPages || 1,
            totalItems: payload.totalItems || payload.products.length,
          };
        } else {
          state.items = [];
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProducts, clearCurrentProduct, clearProductError } =
  productSlice.actions;
export default productSlice.reducer;
