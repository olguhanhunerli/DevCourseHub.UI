"use client";

import { courseService } from "@/services/courseService";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCourseDetail() {
      try {
        const data = await courseService.getCourseById(params.id);
        setCourse(data);
      } catch (error) {
        toast.error(error.message || "Kurs detayı alınamadı.");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) {
      getCourseDetail();
    }
  }, [params.id]);
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700} mb={4}>
          Kurs detayı yükleniyor...
        </Typography>
      </Container>
    );
  }
  if (!course) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700} mb={4}>
          Kurs detayı yüklenemedi.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 4, owerFlow: "hidden" }}>
        <CardMedia
          component="img"
          height="320"
          image={course.thumbnailUrl}
          alt={course.title}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight={700} mb={2} gutterBottom>
            {course.title}
          </Typography>
          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
            <Chip label={course.category} size="small" />
            <Chip label={course.level} size="small" />
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <Rating
              value={Number(course.averageRating) || 0}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              ({course.reviewCount} değerlendirme)
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            {course.description}
          </Typography>
          <Typography variant="body1" fontWeight={600} mb={4}>
            Eğitmen: {course.instructorName}
          </Typography>

          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" fontWeight={700} mb={3}>
            Kurs İçeriği
          </Typography>

          {course.sections?.map((section) => (
            <Accordion key={section.id} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box>
                  <Typography fontWeight={600}>{section.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.lessons.length || 0} ders
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ mb: 2 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                  {section.lessons?.map((lesson) => (
                    <Box
                      key={lesson.id}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                        gap={2}
                        flexWrap="wrap"
                      >
                        <Typography fontWeight={600}>
                          {lesson.displayOrder}. {lesson.title}
                        </Typography>

                        <Box display="flex" gap={1} alignItems="center">
                          {lesson.isPreview && (
                            <Chip
                              label="Preview"
                              color="success"
                              size="small"
                            />
                          )}
                          <Chip
                            label={`${lesson.durationInMinutes} dk`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {lesson.content}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
}
