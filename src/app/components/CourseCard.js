"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function CourseCard({ course }) {
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
        alt={course.title}
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
            wordBreak: "break-word",
          }}
        >
          {course.title}
        </Typography>
        <Typography
          variant="label"
          fontWeight={700}
          gutterBottom
          sx={{
            lineHeight: 1.3,
            minHeight: "calc(1.3em * 2)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {course.instructorName || "Eğitmen Bilgisi Yok"}
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minHeight: 32,
            mb: 3,
          }}
        >
          <Rating
            value={course.rating || 0}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            ({course.reviewCount || 0})
          </Typography>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Button
            component={Link}
            href={`/courses/${course.id}`}
            variant="contained"
            fullWidth
          >
            Detaya Git
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
