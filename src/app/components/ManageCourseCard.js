"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function ManageCourseCard({
  course,
  onPublish,
  onDelete,
  actionLoadingId,
}) {
  const isLoading = actionLoadingId === course.id;
  async function handleDelete() {
    if (confirm("Bu kursu silmek istediğinize emin misiniz?")) {
      await onDelete(course.id);
    }
  }

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
          <Chip
            label={course.isPublished ? "Published" : "Draft"}
            color={course.isPublished ? "success" : "default"}
            size="small"
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            lineHeight: 1.4,
            minHeight: "calc(1.4em * 2)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {course.description || "Açıklama bulunmuyor"}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Stack spacing={1}>
            <Button
              component={Link}
              href={`/courses/${course.id}`}
              variant="contained"
              fullWidth
            >
              Detaya Git
            </Button>

            <Button
              component={Link}
              href={`/courses/${course.id}/edit`}
              variant="contained"
              fullWidth
            >
              Düzenle
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={() => onPublish(course.id)}
              disabled={course.isPublished || isLoading}
            >
              {course.isPublished ? "Yayında" : "Yayınla"}
            </Button>

            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleDelete}
              disabled={isLoading}
            >
              Sil
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
