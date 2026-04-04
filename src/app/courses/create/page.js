"use client";

import CourseForm from "@/app/components/CourseForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { courseService } from "@/services/courseService";

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    setLoading(true);
    try {
      await courseService.createCourse(formData);
      router.push("/my-courses");
    } finally {
      setLoading(false);
    }
  };

  return <CourseForm mode="create" onSubmit={handleCreate} loading={loading} />;
}
