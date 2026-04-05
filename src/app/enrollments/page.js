"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { toast } from "sonner";
import EnrollmentCourseCard from "../components/EnrollmentCourseCard";
import { enrollmentService } from "@/services/enrollmentService";

const CATEGORY_OPTIONS = ["Frontend", "Backend", "Database", "Security"];
const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  async function fetchEnrollments(customFilters = filters) {
    try {
      setLoading(true);

      const data = await enrollmentService.getMyEnrollments(customFilters);

      setEnrollments(data?.items || []);
      setPagination({
        pageNumber: data?.pageNumber || 1,
        pageSize: data?.pageSize || 6,
        totalCount: data?.totalCount || 0,
        totalPages: data?.totalPages || 1,
      });
    } catch (error) {
      toast.error(error.message || "Kayıtlı kurslar alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnrollments(filters);
  }, []);

  function handleFilterChange(field, value) {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      PageNumber: 1,
    }));
  }

  async function handleApplyFilters() {
    await fetchEnrollments(filters);
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
    await fetchEnrollments(clearedFilters);
  }

  async function handlePageChange(_, page) {
    const updatedFilters = {
      ...filters,
      PageNumber: page,
    };

    setFilters(updatedFilters);
    await fetchEnrollments(updatedFilters);
  }

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
            Kayıtlı Kurslarım
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Kayıt olduğun kursları filtreleyip görüntüleyebilirsin.
          </Typography>
        </Box>
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
      ) : enrollments.length === 0 ? (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Kayıtlı kurs bulunamadı
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
            {enrollments.map((course) => (
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
                <EnrollmentCourseCard course={course} />
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
