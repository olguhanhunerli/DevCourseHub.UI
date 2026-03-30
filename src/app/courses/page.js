"use client";

import { courseService } from "@/services/courseService";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CourseCard from "../components/CourseCard";
import { useCoursesContext } from "@/context/CourseProvider";

export default function CoursesPage() {
  const { courses, coursesLoading } = useCoursesContext();
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Kurslar
      </Typography>

      {coursesLoading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Box>
      )}
    </Container>
  );
}
