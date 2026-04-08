"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { toast } from "sonner";
import { categoryService } from "@/services/categoryService";

export default function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await categoryService.getCategoryByDropdown();

      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error?.message || "Kategoriler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        display: { xs: "none", md: "block" },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "sticky",
          top: 88,
          p: 2,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(25,118,210,0.04) 0%, rgba(255,255,255,1) 100%)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <GridViewRoundedIcon color="primary" />
          <Typography variant="h6" fontWeight={800}>
            Kategoriler
          </Typography>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={28} />
          </Box>
        ) : categories.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Henüz kategori bulunamadı.
          </Typography>
        ) : (
          <Stack spacing={1.2}>
            {categories.map((category) => (
              <Box
                key={category.id}
                component={Link}
                href={`/category/${encodeURIComponent(category.name)}`}
                sx={(theme) => ({
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.5,
                  py: 1.3,
                  borderRadius: 3,
                  color: "text.primary",
                  border: "1px solid",
                  borderColor: "transparent",
                  transition: "all 0.2s ease",
                  backgroundColor: alpha(theme.palette.primary.main, 0.03),
                  "&:hover": {
                    transform: "translateX(4px)",
                    borderColor: alpha(theme.palette.primary.main, 0.18),
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                })}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    pr: 1,
                  }}
                >
                  {category.name}
                </Typography>

                <KeyboardArrowRightRoundedIcon fontSize="small" />
              </Box>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
