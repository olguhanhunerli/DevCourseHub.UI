"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  LinearProgress,
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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

const defaultValues = {
  title: "",
  description: "",
  category: "",
  level: "",
};

const levelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

export default function CourseForm({
  initialValues = defaultValues,
  onSubmit = async () => {},
  loading = false,
  mode = "create",
}) {
  const [formData, setFormData] = useState(defaultValues);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isEdit = mode === "edit";

  useEffect(() => {
    setFormData({
      ...defaultValues,
      ...initialValues,
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filledCount = useMemo(() => {
    return Object.values(formData).filter(
      (value) => String(value).trim() !== "",
    ).length;
  }, [formData]);

  const progress = (filledCount / 4) * 100;

  const isValid =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.category.trim() &&
    formData.level.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit(formData);
      setSuccess(true);

      if (!isEdit) {
        setFormData(defaultValues);
      }
    } catch (err) {
      setError(err?.message || "İşlem başarısız oldu");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(79,70,229,0.08), transparent 28%), radial-gradient(circle at top right, rgba(37,99,235,0.08), transparent 24%), linear-gradient(180deg, #f8fbff 0%, #f4f7fb 100%)",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "stretch",
            gap: 3,
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 70%" },
              minWidth: 0,
            }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: 6,
                overflow: "hidden",
                border: "1px solid rgba(226,232,240,0.9)",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 24px 80px rgba(15, 23, 42, 0.10)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  px: { xs: 3, md: 5 },
                  py: { xs: 4, md: 5 },
                  color: "white",
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1d4ed8 42%, #4f46e5 72%, #7c3aed 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 18%), radial-gradient(circle at 85% 30%, rgba(255,255,255,0.12), transparent 20%)",
                    pointerEvents: "none",
                  }}
                />

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                  spacing={3}
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Box>
                    <Stack
                      direction="row"
                      spacing={1.2}
                      sx={{ mb: 2, flexWrap: "wrap" }}
                    ></Stack>

                    <Typography
                      sx={{
                        fontSize: { xs: 28, md: 44 },
                        fontWeight: 900,
                        lineHeight: 1.08,
                        mb: 1.4,
                        maxWidth: 760,
                      }}
                    >
                      {isEdit
                        ? "Kursunu Güçlü Bir Şekilde Güncelle"
                        : "Yeni Nesil Bir Kurs Deneyimi Oluştur"}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 15.5,
                        opacity: 0.88,
                        maxWidth: 720,
                        lineHeight: 1.7,
                      }}
                    >
                      {isEdit
                        ? "Başlık, açıklama, kategori ve seviye alanlarını güncelleyerek kursunun profesyonel görünümünü güçlendir."
                        : "Eğitmen paneline yakışan premium bir kurs oluşturmak için bilgileri eksiksiz ve net şekilde doldur."}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 96,
                      height: 96,
                      minWidth: 96,
                      borderRadius: "28px",
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(10px)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  >
                    <AutoStoriesOutlinedIcon
                      sx={{ fontSize: 42, color: "white" }}
                    />
                  </Box>
                </Stack>
              </Box>

              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <Box>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        spacing={2}
                        sx={{ mb: 2 }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 26,
                              fontWeight: 900,
                              color: "#0f172a",
                              mb: 0.5,
                            }}
                          >
                            Kurs Bilgileri
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14.5,
                              color: "#64748b",
                            }}
                          >
                            Form ne kadar doluysa yayın kalitesi o kadar güçlü
                            görünür.
                          </Typography>
                        </Box>

                        <Chip
                          label={`${filledCount}/4 alan tamamlandı`}
                          sx={{
                            bgcolor: "#eef2ff",
                            color: "#3730a3",
                            fontWeight: 800,
                            borderRadius: 999,
                          }}
                        />
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 10,
                          borderRadius: 999,
                          bgcolor: "#e2e8f0",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                            background:
                              "linear-gradient(90deg, #2563eb 0%, #4f46e5 60%, #7c3aed 100%)",
                          },
                        }}
                      />
                    </Box>

                    <Stack spacing={3}>
                      <Box>
                        <TextField
                          fullWidth
                          label="Kurs Başlığı"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          placeholder="Örn: Modern React ile Production Seviye Proje Geliştirme"
                          helperText={`${formData.title.length}/80 karakter`}
                          inputProps={{ maxLength: 80 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AutoStoriesOutlinedIcon
                                  sx={{ color: "#64748b" }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={premiumFieldSx}
                        />
                      </Box>

                      <Box>
                        <TextField
                          fullWidth
                          label="Açıklama"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          multiline
                          minRows={7}
                          placeholder="Kursun içeriğini, hedef kitlesini, hangi problemleri çözdüğünü ve öğrencinin bu eğitim sonunda neler kazanacağını anlat."
                          helperText={`${formData.description.length}/600 karakter`}
                          inputProps={{ maxLength: 600 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{ alignSelf: "flex-start", mt: 1.8 }}
                              >
                                <DescriptionOutlinedIcon
                                  sx={{ color: "#64748b" }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            ...premiumFieldSx,
                            "& .MuiOutlinedInput-root": {
                              ...premiumFieldSx["& .MuiOutlinedInput-root"],
                              minHeight: 180,
                              alignItems: "flex-start",
                              py: 1,
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 3,
                        }}
                      >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
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
                                  <CategoryOutlinedIcon
                                    sx={{ color: "#64748b" }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            sx={premiumFieldSx}
                          />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <FormControl fullWidth required>
                            <InputLabel id="level-label">Seviye</InputLabel>
                            <Select
                              labelId="level-label"
                              name="level"
                              value={formData.level}
                              onChange={handleChange}
                              label="Seviye"
                              sx={{
                                borderRadius: 3.5,
                                bgcolor: "#fff",
                                minHeight: 60,
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#dbe4f0",
                                  borderWidth: "1.5px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#94a3b8",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#4f46e5",
                                    borderWidth: "2px",
                                  },
                                "&.Mui-focused": {
                                  boxShadow: "0 0 0 4px rgba(79,70,229,0.08)",
                                },
                              }}
                              startAdornment={
                                <InputAdornment position="start" sx={{ ml: 1 }}>
                                  <SchoolOutlinedIcon
                                    sx={{ color: "#64748b", mr: 1 }}
                                  />
                                </InputAdornment>
                              }
                            >
                              {levelOptions.map((level) => (
                                <MenuItem key={level.value} value={level.value}>
                                  {level.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>

                      {error && (
                        <Alert
                          severity="error"
                          sx={{
                            borderRadius: 3,
                            border: "1px solid rgba(239,68,68,0.14)",
                          }}
                        >
                          {error}
                        </Alert>
                      )}

                      <Box
                        sx={{
                          p: { xs: 2.2, md: 2.8 },
                          borderRadius: 4,
                          bgcolor: "#f8fbff",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          justifyContent="space-between"
                          alignItems={{ xs: "stretch", md: "center" }}
                          spacing={2}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 900,
                                color: "#0f172a",
                                mb: 0.5,
                                fontSize: 16,
                              }}
                            >
                              {isEdit
                                ? "Değişiklikleri kaydetmeye hazır mısın?"
                                : "Kursu yayına hazırlamaya hazır mısın?"}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#64748b",
                                lineHeight: 1.7,
                              }}
                            >
                              Son bir kontrol yap ve profesyonel bir ilk izlenim
                              bırak.
                            </Typography>
                          </Box>

                          <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || !isValid}
                            startIcon={
                              isEdit ? <EditRoundedIcon /> : <AddRoundedIcon />
                            }
                            sx={{
                              minWidth: { xs: "100%", md: 240 },
                              height: 56,
                              borderRadius: 3.5,
                              textTransform: "none",
                              fontSize: 15.5,
                              fontWeight: 900,
                              letterSpacing: 0.2,
                              boxShadow: "0 16px 30px rgba(79,70,229,0.24)",
                              background:
                                "linear-gradient(135deg, #2563eb 0%, #4f46e5 55%, #7c3aed 100%)",
                              "&:hover": {
                                boxShadow: "0 18px 34px rgba(79,70,229,0.30)",
                                background:
                                  "linear-gradient(135deg, #1d4ed8 0%, #4338ca 55%, #6d28d9 100%)",
                              },
                              "&.Mui-disabled": {
                                color: "rgba(255,255,255,0.75)",
                                background: "#94a3b8",
                              },
                            }}
                          >
                            {loading
                              ? isEdit
                                ? "Güncelleniyor..."
                                : "Oluşturuluyor..."
                              : isEdit
                                ? "Kursu Güncelle"
                                : "Kurs Oluştur"}
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 30%" },
              minWidth: { xs: "100%", md: 320 },
            }}
          >
            <Stack spacing={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 6,
                  border: "1px solid rgba(226,232,240,0.9)",
                  background: "rgba(255,255,255,0.9)",
                  boxShadow: "0 20px 50px rgba(15,23,42,0.07)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 3,
                        display: "grid",
                        placeItems: "center",
                        background:
                          "linear-gradient(135deg, #dbeafe 0%, #eef2ff 100%)",
                      }}
                    >
                      <MenuBookRoundedIcon sx={{ color: "#4f46e5" }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: "#0f172a" }}>
                        Canlı Önizleme
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                        Kursunun nasıl görüneceğine hızlı bakış
                      </Typography>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      borderRadius: 4,
                      p: 2.4,
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Chip
                      size="small"
                      label={formData.level || "Seviye seçilmedi"}
                      sx={{
                        mb: 1.5,
                        bgcolor: "#eef2ff",
                        color: "#4338ca",
                        fontWeight: 800,
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: 20,
                        color: "#0f172a",
                        lineHeight: 1.3,
                        mb: 1,
                      }}
                    >
                      {formData.title || "Kurs başlığı burada görünecek"}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#64748b",
                        lineHeight: 1.7,
                        mb: 2,
                      }}
                    >
                      {formData.description
                        ? formData.description.slice(0, 180) +
                          (formData.description.length > 180 ? "..." : "")
                        : "Kurs açıklaması henüz girilmedi."}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                        Kategori
                      </Typography>
                      <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>
                        {formData.category || "-"}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={{
                  borderRadius: 6,
                  border: "1px solid rgba(226,232,240,0.9)",
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #fcfcff 100%)",
                  boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "#0f172a",
                      fontSize: 18,
                      mb: 2,
                    }}
                  >
                    Premium Form İpuçları
                  </Typography>

                  <Stack spacing={1.6}>
                    {[
                      "Başlığı kısa, net ve sonuç odaklı yaz.",
                      "Açıklamada hedef kitleyi ve kazanımları belirt.",
                      "Kategori alanını kullanıcıların arama davranışına göre seç.",
                      "Seviyeyi doğru belirlemek dönüşümü artırır.",
                    ].map((item) => (
                      <Stack
                        key={item}
                        direction="row"
                        spacing={1.2}
                        alignItems="flex-start"
                      >
                        <CheckCircleRoundedIcon
                          sx={{ color: "#22c55e", fontSize: 20, mt: "2px" }}
                        />
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "#475569",
                            lineHeight: 1.7,
                          }}
                        >
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={2600}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 3,
            fontWeight: 700,
            boxShadow: "0 10px 30px rgba(34,197,94,0.25)",
          }}
        >
          {isEdit ? "Kurs başarıyla güncellendi" : "Kurs başarıyla oluşturuldu"}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const premiumFieldSx = {
  "& .MuiFormHelperText-root": {
    ml: 0.5,
    mt: 1,
    color: "#94a3b8",
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-root": {
    minHeight: 60,
    borderRadius: 3.5,
    bgcolor: "#fff",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "#dbe4f0",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4f46e5",
      borderWidth: "2px",
    },
    "&.Mui-focused": {
      boxShadow: "0 0 0 4px rgba(79,70,229,0.08)",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4338ca",
  },
};
