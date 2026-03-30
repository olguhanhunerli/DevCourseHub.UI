"use client";
import { courseService } from "@/services/courseService";
import { toast } from "sonner";

import { createContext, useContext, useEffect, useState } from "react";

const CoursesContext = createContext(null);

export function CoursesProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesLoaded, setCoursesLoaded] = useState(false);

  async function fetchCourses(force = false) {
    if (coursesLoaded && !force) return;

    try {
      setCoursesLoading(true);
      const data = await courseService.getCourses();
      setCourses(data.items || []);
      setCoursesLoaded(true);
    } catch (error) {
      toast.error(error.message || "Kurslar alınamadı.");
    } finally {
      setCoursesLoading(false);
    }
  }
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <CoursesContext.Provider
      value={{
        courses,
        coursesLoading,
        fetchCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

export function useCoursesContext() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCoursesContext must be used within a CoursesProvider");
  }
  return context;
}
