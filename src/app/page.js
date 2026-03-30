"use client";

import Link from "next/link";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useCoursesContext } from "@/context/CourseProvider";
import FeaturedCoursesSlider from "./components/FeaturedCoursesSlider";

export default function HomePage() {
  const { courses, coursesLoading } = useCoursesContext();

  const featuredCourses = courses.slice(0, 6);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box mb={6}>
        <Typography variant="h3" fontWeight={700} mb={2}>
          DevCourseHub
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Modern online öğrenme platformu ile yazılım dünyasına adım atın. Geniş
          kurs yelpazesi, deneyimli eğitmenler ve etkileşimli öğrenme
          araçlarıyla, kariyer hedeflerinize ulaşmanız için gereken her şeyi
          sunuyoruz. Hemen kaydolun ve geleceğinizi şekillendirmeye başlayın!
        </Typography>

        {/* <Button component={Link} href="/courses" variant="contained">
          Tüm Kursları Gör
        </Button> */}
      </Box>

      <Box>
        <Typography variant="h4" fontWeight={700} mb={4}>
          Öne çıkan Kurslar
        </Typography>

        {coursesLoading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : (
          <FeaturedCoursesSlider courses={featuredCourses} />
        )}
      </Box>
    </Container>
  );
}
