"use client";

import Link from "next/link";
import { AppBar, Box, Button, Toolbar, Typography, Stack } from "@mui/material";
import { useAuthContext } from "@/context/AuthProvider";

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuthContext();

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
              <Typography variant="body2">
                {user?.fullName || user?.email}
              </Typography>

              <Button color="inherit" onClick={logout} href="/">
                Çıkış Yap
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
