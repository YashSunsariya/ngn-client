import api from "../lib/api";

export const categoryService = {
  fetchCategories: async () => {
    const { data } = await api.get("/public/categories");
    return data.data || data.categories || data || [];
  },
};
