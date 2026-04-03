import CourseForm from "@/app/components/CourseForm";
import { Container, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

export default function CreateCoursePage() {
  // const router = useRouter();
  return (
    <Container sx={{ mt: 4 }}>
      <CourseForm />
    </Container>
  );
}
