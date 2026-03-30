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
        borderRadius: 3,
        boxShadow: 4,
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={course.thumbnailUrl || "/placeholder-course.png"}
        alt={course.title}
      />
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {course.title}
        </Typography>

        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip label={course.category} size="small" />
          <Chip label={course.level} size="small" />
        </Box>

        <Box display="flex" alignItems="center" gap={3} mt={2} mb={3}>
          <Rating
            value={course.rating || 0}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            ({course.reviewCount})
          </Typography>
        </Box>
        <Button
          component={Link}
          href={`/courses/${course.id}`}
          variant="contained"
          fullWidth
        >
          Detaya Git
        </Button>
      </CardContent>
    </Card>
  );
}
