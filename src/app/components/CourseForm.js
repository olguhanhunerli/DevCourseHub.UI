"use client";

import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";

export default function CourseForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await courseService.createCourse(formData);

      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        category: "",
        level: "",
      });

      setTimeout(() => {
        router.push("/my-courses");
      }, 1000);
    } catch (err) {
      setError(err.message || "Kurs oluşturulamadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Card
          elevation={0}
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid #e6ebf2",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Box
            sx={{
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
              background:
                "linear-gradient(135deg, #111827 0%, #1e3a8a 55%, #4f46e5 100%)",
              color: "white",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
              spacing={3}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    opacity: 0.8,
                    mb: 1,
                  }}
                >
                  Course Management
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: 30, md: 40 },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 1,
                  }}
                >
                  Yeni Kurs Oluştur
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    opacity: 0.82,
                    maxWidth: 620,
                  }}
                >
                  Yeni kursunu oluşturmak için aşağıdaki alanları doldur.
                  Başlık, açıklama, kategori ve seviyeyi net şekilde girmen
                  kursunun daha profesyonel görünmesini sağlar.
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 84,
                  height: 84,
                  minWidth: 84,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <AutoStoriesOutlinedIcon
                  sx={{ fontSize: 38, color: "white" }}
                />
              </Box>
            </Stack>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#0f172a",
                      mb: 0.5,
                    }}
                  >
                    Kurs Bilgileri
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#64748b",
                    }}
                  >
                    Formu eksiksiz doldur ve kursunu yayına hazır hale getir.
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Kurs Başlığı"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Örn: Modern React ile Proje Geliştirme"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AutoStoriesOutlinedIcon
                              sx={{ color: "#64748b" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 58,
                          borderRadius: 3,
                          bgcolor: "white",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Açıklama"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      multiline
                      minRows={6}
                      placeholder="Kurs içeriğini, hedef kitlesini ve kullanıcıların bu kurstan ne kazanacağını anlat."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1.5 }}
                          >
                            <DescriptionOutlinedIcon
                              sx={{ color: "#64748b" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "white",
                          alignItems: "flex-start",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Kategori"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      placeholder="Örn: Frontend Development"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CategoryOutlinedIcon sx={{ color: "#64748b" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 58,
                          borderRadius: 3,
                          bgcolor: "white",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="level-label">Seviye</InputLabel>
                      <Select
                        labelId="level-label"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        label="Seviye"
                        sx={{
                          height: 58,
                          borderRadius: 3,
                          bgcolor: "white",
                        }}
                        startAdornment={
                          <InputAdornment position="start" sx={{ ml: 1 }}>
                            <SchoolOutlinedIcon
                              sx={{ color: "#64748b", mr: 1 }}
                            />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {error && (
                    <Grid item xs={12}>
                      <Alert
                        severity="error"
                        sx={{
                          borderRadius: 3,
                        }}
                      >
                        {error}
                      </Alert>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        mt: 1,
                        p: 2,
                        borderRadius: 4,
                        bgcolor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        alignItems={{ xs: "stretch", md: "center" }}
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "#0f172a",
                              mb: 0.5,
                            }}
                          >
                            Kursu kaydetmeye hazır mısın?
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: "#64748b",
                            }}
                          >
                            Bilgileri kontrol ettikten sonra kursu
                            oluşturabilirsin.
                          </Typography>
                        </Box>

                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          startIcon={<AddRoundedIcon />}
                          sx={{
                            minWidth: 220,
                            height: 54,
                            borderRadius: 3,
                            textTransform: "none",
                            fontSize: 15,
                            fontWeight: 800,
                            boxShadow: "none",
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                            "&:hover": {
                              boxShadow: "none",
                              background:
                                "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)",
                            },
                          }}
                        >
                          {loading ? "Oluşturuluyor..." : "Kurs Oluştur"}
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={2500}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Kurs başarıyla oluşturuldu
        </Alert>
      </Snackbar>
    </Box>
  );
}
