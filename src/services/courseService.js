import { apiFetch } from "@/lib/api";

export const courseService = {
  getCourses() {
    return apiFetch("/api/Course");
  },
  getCourseById(id) {
    return apiFetch(`/api/Course/${id}`);
  },
};
