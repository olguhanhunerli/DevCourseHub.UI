"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";
import CourseForm from "@/app/components/CourseForm";

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleUpdate = async (formData) => {
    setLoading(true);
    try {
      await courseService.updateCourse(id, formData);
      router.push("/my-courses");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <div>Yükleniyor...</div>;
  if (!course) return <div>Kurs bulunamadı</div>;

  return (
    <CourseForm
      mode="edit"
      initialValues={{
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        level: course.level || "",
      }}
      onSubmit={handleUpdate}
      loading={loading}
    />
  );
}
