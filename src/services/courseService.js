import { apiFetch } from "@/lib/api";

export const courseService = {
  getCourses(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();

    return apiFetch(`/api/course${queryString ? `?${queryString}` : ""}`);
  },

  getCourseById(id) {
    return apiFetch(`/api/course/${id}`);
  },
  getMyCourses(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();

    return apiFetch(`/api/course/my${queryString ? `?${queryString}` : ""}`);
  },
  getAdminCourses() {
    return apiFetch("/api/course/admin");
  },
  createCourse(payload) {
    return apiFetch("/api/course/my/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  updateCourse(id, payload) {
    return apiFetch(`/api/course/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  deleteCourse(id) {
    return apiFetch(`/api/course/${id}`, {
      method: "DELETE",
    });
  },
  publishCourse(id) {
    return apiFetch(`/api/course/${id}/publish`, {
      method: "PATCH",
    });
  },
};
