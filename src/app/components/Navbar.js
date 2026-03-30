"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        borderBottom: "1px solid",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: "0 !important" }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
            }}
          >
            DevCourseHub
          </Typography>
          <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
            <Button component={Link} href="/" color="inherit">
              Anasayfa
            </Button>
            <Button component={Link} href="/courses" color="inherit">
              Kurslar
            </Button>
            <Button component={Link} href="/login" color="contained">
              Giriş Yap
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
