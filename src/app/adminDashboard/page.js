"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { categoryService } from "@/services/categoryService";
import { courseService } from "@/services/courseService";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    categories: 0,
    courses: 0,
    users: 0,
    instructors: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [categoriesRes, coursesRes] = await Promise.all([
          categoryService.getCategoryByDropdown(),
          courseService.getCourses({ PageNumber: 1, PageSize: 20 }),
        ]);

        const categoryCount = Array.isArray(categoriesRes)
          ? categoriesRes.length
          : Array.isArray(categoriesRes?.items)
            ? categoriesRes.items.length
            : 0;

        const courseCount = Array.isArray(coursesRes)
          ? coursesRes.length
          : Array.isArray(coursesRes?.items)
            ? coursesRes.items.length
            : 0;

        setStats({
          categories: categoryCount,
          courses: courseCount,
          users: 0,
          instructors: 0,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError(err?.message || "Dashboard verileri alınamadı.");
        toast.error(err?.message || "Dashboard verileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const modules = useMemo(
    () => [
      {
        title: "Kategoriler",
        value: stats.categories,
        description: "Toplam kategori sayısı",
        href: "/admin/categories",
        buttonText: "Kategorileri Yönet",
      },
      {
        title: "Kurslar",
        value: stats.courses,
        description: "Toplam kurs sayısı",
        href: "/courses",
        buttonText: "Kursları Yönet",
      },
      {
        title: "Kullanıcılar",
        value: stats.users,
        description: "Kayıtlı kullanıcı sayısı",
        href: "/admin/users",
        buttonText: "Kullanıcıları Yönet",
      },
      {
        title: "Eğitmenler",
        value: stats.instructors,
        description: "Aktif eğitmen sayısı",
        href: "/admin/instructors",
        buttonText: "Eğitmenleri Yönet",
      },
    ],
    [stats],
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistem modüllerini buradan takip edebilir ve yönetebilirsin.
        </Typography>
      </Box>

      {error ? (
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }}
        >
          <Typography variant="body2" color="error.main">
            {error}
          </Typography>
        </Box>
      ) : null}

      <Grid container spacing={3}>
        {modules.map((item) => (
          <Grid key={item.title} item xs={12} sm={6} md={4} lg={3}>
            <AdminDashboardCard
              title={item.title}
              value={item.value}
              description={item.description}
              href={item.href}
              buttonText={item.buttonText}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
