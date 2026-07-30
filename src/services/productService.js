import api from "../lib/api";

export const productService = {
  fetchProducts: async (params = {}) => {
    const { data } = await api.get("/public/products", { params });
    return data.data || data.products || data || [];
  },

  fetchProductById: async (id) => {
    const { data } = await api.get(`/public/products/${id}`);
    return data.data || data.product || data || null;
  },
};
