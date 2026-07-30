import api from "../lib/api";

export const brandService = {
  fetchBrands: async () => {
    const { data } = await api.get("/public/brands");
    return data.data || data.brands || data || [];
  },
};
