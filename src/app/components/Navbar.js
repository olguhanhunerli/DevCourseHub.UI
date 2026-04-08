"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuthContext();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    router.push("/");
  };

  async function getMe() {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    getMe();
  }, []);
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700,
          }}
        >
          DevCourseHub
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center">
          <Button component={Link} href="/courses" color="inherit">
            Kurslar
          </Button>
          {loading ? null : !isAuthenticated ? (
            <>
              <Button component={Link} href="/login" color="inherit">
                Giriş Yap
              </Button>

              <Button
                component={Link}
                href="/register"
                variant="contained"
                color="secondary"
              >
                Kayıt Ol
              </Button>
            </>
          ) : (
            <>
              {user?.role === "Admin" && (
                <Button component={Link} href="/adminDashboard" color="inherit">
                  Admin Paneli
                </Button>
              )}
              {user?.role === "Instructor" || user?.role === "Admin" ? (
                <Button component={Link} href="/my-courses" color="inherit">
                  Kurslarım
                </Button>
              ) : null}
              {user?.role === "Student" && (
                <Button component={Link} href="/enrollments" color="inherit">
                  Kayıtlı Kurslarım
                </Button>
              )}
              <Button color="inherit" onClick={handleOpen}>
                {user?.fullName || user?.email}
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  component={Link}
                  href="/profile"
                  onClick={handleClose}
                >
                  Profil
                </MenuItem>

                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
