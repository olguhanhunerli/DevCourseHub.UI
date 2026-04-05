import { apiFetch } from "@/lib/api";

export const enrollmentService = {
  getMyEnrollments(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();

    return apiFetch(
      `/api/enrollments/my-courses${queryString ? `?${queryString}` : ""}`,
    );
  },

  getCourseById(id) {
    return apiFetch(`/api/course/${id}`);
  },
};
