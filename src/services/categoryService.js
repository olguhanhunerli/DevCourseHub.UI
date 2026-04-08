import { apiFetch } from "@/lib/api";

export const categoryService = {
  getCategories(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();

    return apiFetch(`/api/category${queryString ? `?${queryString}` : ""}`);
  },

  getCategoryById(id) {
    return apiFetch(`/api/category/${id}`);
  },
  getCategoryByDropdown() {
    return apiFetch(`/api/category/dropdown`);
  },

  createCategory(payload) {
    return apiFetch("/api/category", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateCategory(id, payload) {
    return apiFetch(`/api/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteCategory(id) {
    return apiFetch(`/api/category/${id}`, {
      method: "DELETE",
    });
  },
};
