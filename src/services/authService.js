import { apiFetch } from "@/lib/api";

export const authService = {
  login(credentials) {
    return apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  register(formData) {
    return apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  },
  getMe() {
    return apiFetch("/api/auth/me", {
      method: "GET",
    });
  },
  logout() {
    return apiFetch("/api/auth/logout", {
      method: "POST",
    });
  },
};
