"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function EnrollmentCourseCard({ course, onUnenroll }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 3,
        boxShadow: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={course.thumbnailUrl || "/placeholder-course.png"}
        alt={course.courseTitle}
        sx={{
          height: 200,
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{
            lineHeight: 1.3,
            minHeight: "calc(1.3em * 2)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.courseTitle || "Başlıksız Kurs"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            minHeight: 32,
            mb: 2,
          }}
        >
          <Chip label={course.category || "Kategori Yok"} size="small" />
          <Chip label={course.level || "Seviye Yok"} size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Kayıt:{" "}
          {course.enrollAt
            ? new Date(course.enrollAt).toLocaleDateString("tr-TR")
            : "Bilinmiyor"}
        </Typography>
        <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
          <Button
            component={Link}
            href={`/courses/${course.courseId}`}
            variant="contained"
            fullWidth
          >
            Detaya Git
          </Button>

          {onUnenroll && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => onUnenroll(course)}
            >
              Ayrıl
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
