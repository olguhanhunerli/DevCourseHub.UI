"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import { courseService } from "@/services/courseService";
import ManageCourseCard from "../components/ManageCourseCard";

const CATEGORY_OPTIONS = ["Frontend", "Backend", "Database", "Security"];
const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [filters, setFilters] = useState({
    Search: "",
    Category: "",
    Level: "",
    PageNumber: 1,
    PageSize: 6,
  });

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 6,
    totalCount: 0,
    totalPages: 1,
  });

  async function fetchMyCourses(customFilters = filters) {
    try {
      setLoading(true);
      const data = await courseService.getAdminCourses(customFilters);

      setCourses(data?.items || []);
      setPagination({
        pageNumber: data?.pageNumber || 1,
        pageSize: data?.pageSize || 6,
        totalCount: data?.totalCount || 0,
        totalPages: data?.totalPages || 1,
      });
    } catch (error) {
      toast.error(error.message || "Kurslar alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyCourses(filters);
  }, []);

  function handleFilterChange(field, value) {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      PageNumber: 1,
    }));
  }

  async function handleApplyFilters() {
    await fetchMyCourses(filters);
  }

  async function handleClearFilters() {
    const clearedFilters = {
      Search: "",
      Category: "",
      Level: "",
      PageNumber: 1,
      PageSize: 6,
    };

    setFilters(clearedFilters);
    await fetchMyCourses(clearedFilters);
  }

  async function handlePageChange(_, page) {
    const updatedFilters = {
      ...filters,
      PageNumber: page,
    };

    setFilters(updatedFilters);
    await fetchMyCourses(updatedFilters);
  }

  async function handlePublish(id) {
    try {
      setActionLoadingId(id);
      await courseService.publishCourse(id);
      toast.success("Kurs başarıyla yayınlandı.");
      await fetchMyCourses(filters);
    } catch (error) {
      toast.error(error.message || "Kurs yayınlanırken hata oluştu.");
    } finally {
      setActionLoadingId(null);
    }
  }

  const handleDeleteCourse = async (id) => {
    try {
      setActionLoadingId(id);

      const response = await fetch(`/api/course?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Kurs silinemedi");
      }

      toast.success("Kurs başarıyla silindi.");
      await fetchMyCourses(filters);
    } catch (error) {
      toast.error(error.message || "Bir hata oluştu");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Tüm Kurslar
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Oluşturulmuş olan bütün kursları buradan yönetebilirsin. Kursları
            yayınlayabilir, düzenleyebilir veya silebilirsin.
          </Typography>
        </Box>

        <Button variant="contained" component={Link} href="/courses/create">
          Yeni Kurs Oluştur
        </Button>
      </Stack>

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Kurs başlığı ara..."
                size="small"
                value={filters.Search}
                onChange={(e) => handleFilterChange("Search", e.target.value)}
                sx={{
                  minWidth: { xs: "100%", sm: 260 },
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                select
                size="small"
                value={filters.Category}
                onChange={(e) => handleFilterChange("Category", e.target.value)}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) return "Tüm Kategoriler";
                    return selected;
                  },
                }}
                sx={{
                  minWidth: { xs: "100%", sm: 180 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem value="">
                  <em>Tüm Kategoriler</em>
                </MenuItem>

                {CATEGORY_OPTIONS.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                size="small"
                value={filters.Level}
                onChange={(e) => handleFilterChange("Level", e.target.value)}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) return "Tüm Seviyeler";
                    return selected;
                  },
                }}
                sx={{
                  minWidth: { xs: "100%", sm: 180 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem value="">
                  <em>Tüm Seviyeler</em>
                </MenuItem>

                {LEVEL_OPTIONS.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  ml: { md: "auto" },
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleApplyFilters}
                  sx={{ minWidth: 110 }}
                >
                  Filtrele
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  sx={{ minWidth: 110 }}
                >
                  Temizle
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {loading ? (
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : courses.length === 0 ? (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Sonuç bulunamadı
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Filtrelerini değiştirerek tekrar deneyebilirsin.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {courses.map((course) => (
              <Box
                key={course.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 12px)",
                    md: "calc(33.333% - 16px)",
                  },
                  display: "flex",
                }}
              >
                <ManageCourseCard
                  course={course}
                  onPublish={handlePublish}
                  onDelete={handleDeleteCourse}
                  actionLoading={actionLoadingId === course.id}
                />
              </Box>
            ))}
          </Box>

          <Stack alignItems="center" mt={5}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.pageNumber}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </>
      )}
    </Container>
  );
}
