"use client";

import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authService.register(formData);
      toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Kayıt sırasında hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8, mt: 30 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          Kayıt Ol
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Yeni hesap oluşturarak öğrenmeye hemen başla.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Ad Soyad"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="E-posta"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Şifre"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ mt: 3 }}
          >
            {isLoading ? "Kayıt olunuyor..." : "Kayıt Ol"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
