"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FeaturedCoursesSlider from "./components/FeaturedCoursesSlider";
import { useCoursesContext } from "@/context/CourseProvider";
import CategorySlider from "./components/FeaturedCategorySlider";

export default function HomePage() {
  const { courses, coursesLoading } = useCoursesContext();

  const featuredCourses = courses.slice(0, 6);

  const benefits = [
    {
      title: "Uzman Eğitmenler",
      description:
        "Alanında deneyimli eğitmenlerden pratik ve gerçek dünya bilgileri öğrenin.",
      icon: <SchoolIcon fontSize="large" />,
    },
    {
      title: "Kendi Hızında Öğren",
      description:
        "İstediğin zaman derslere eriş ve esnek öğrenme ile adım adım ilerle.",
      icon: <PlayCircleOutlineIcon fontSize="large" />,
    },
    {
      title: "İlerlemeni Takip Et",
      description:
        "Öğrenme sürecini takip ederek motivasyonunu yüksek tut ve hedeflerine ulaş.",
      icon: <EmojiEventsIcon fontSize="large" />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 6, md: 10 },
          px: 2,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(25,118,210,0.08), rgba(156,39,176,0.08))",
          mb: 8,
        }}
      >
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: { xs: "2.2rem", md: "3.5rem" },
            mb: 2,
          }}
        >
          Modern Teknolojileri Öğrenmeye Başla
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 750,
            mx: "auto",
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Frontend, backend, veritabanı ve daha fazlası için kaliteli kursları
          keşfet. Yapılandırılmış içerikler ve pratik derslerle becerilerini
          geliştir.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            component={Link}
            href="/courses"
            variant="contained"
            size="large"
          >
            Kursları Keşfet
          </Button>

          <Button
            component={Link}
            href="/login"
            variant="outlined"
            size="large"
          >
            Hemen Başla
          </Button>
        </Stack>
      </Box>
      <Box mb={8}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Kategorilere Göz At
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          İlgi alanına göre kursları keşfet ve sana en uygun yolu seç.
        </Typography>

        <CategorySlider />
      </Box>
      <Box mb={8}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Öne Çıkan Kurslar
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          En popüler ve başlangıç seviyesine uygun kurslarla öğrenmeye başla.
        </Typography>

        {coursesLoading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : (
          <FeaturedCoursesSlider courses={featuredCourses} />
        )}
      </Box>

      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Neden DevCourseHub?
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Öğrenmeyi daha pratik, etkili ve takip edilebilir hale getiren modern
          bir platform.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {benefits.map((item) => (
            <Paper
              key={item.title}
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
              }}
            >
              <Box mb={2}>{item.icon}</Box>

              <Typography variant="h6" fontWeight={700} mb={1.5}>
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                lineHeight={1.8}
              >
                {item.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
