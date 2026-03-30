"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthProvider";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    handleMenuClose();
    logout();
    router.push("/");
  }

  const userInitial = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: "0 !important", minHeight: 72 }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 800,
            }}
          >
            DevCourseHub
          </Typography>

          <Box
            sx={{
              ml: "auto",
              display: "flex",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <Button component={Link} href="/" color="inherit">
              Anasayfa
            </Button>

            <Button component={Link} href="/courses" color="inherit">
              Kurslar
            </Button>

            {!isAuthenticated ? (
              <>
                <Button component={Link} href="/login" variant="outlined">
                  Giriş Yap
                </Button>

                <Button component={Link} href="/register" variant="contained">
                  Kayıt Ol
                </Button>
              </>
            ) : (
              <>
                {/* {user?.role ? (
                  <Chip
                    label={user.role}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ) : null} */}

                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{
                    textTransform: "none",
                    borderRadius: 999,
                    px: 1,
                  }}
                  startIcon={
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 14,
                      }}
                    >
                      {userInitial}
                    </Avatar>
                  }
                >
                  {user?.fullName || "Kullanıcı"}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5, minWidth: 220 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {user?.fullName || "Kullanıcı"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {user?.email || ""}
                    </Typography>
                  </Box>

                  <Divider />

                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      router.push("/profile");
                    }}
                  >
                    Profil
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      router.push("/courses");
                    }}
                  >
                    Kurslarım
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
