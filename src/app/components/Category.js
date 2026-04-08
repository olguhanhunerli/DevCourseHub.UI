"use client";

import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { toast } from "sonner";
import { categoryService } from "@/services/categoryService";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await categoryService.getCategories({
        PageNumber: 1,
        PageSize: 10,
      });

      setCategories(data?.items || []);
    } catch (error) {
      toast.error(error.message || "Kategoriler alınırken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container sx={{ py: 4, minHeight: "80vh" }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Kategoriler
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : categories.length === 0 ? (
        <Typography>Hiç kategori bulunamadı.</Typography>
      ) : (
        <Box display="grid" gap={2}>
          {categories.map((category) => (
            <Paper key={category.id} sx={{ p: 2 }}>
              <Typography variant="h6">{category.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {category.id}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}
