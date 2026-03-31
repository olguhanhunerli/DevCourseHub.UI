"use client";
import { useAuthContext } from "@/context/AuthProvider";
import { authService } from "@/services/authService";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(formData);

      toast.success("Giriş başarılı!");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Giriş başarısız!");
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
          Giriş Yap
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Hesabına giriş yaparak öğrenmeye devam et.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
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
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
