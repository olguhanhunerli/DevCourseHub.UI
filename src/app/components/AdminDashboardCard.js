"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

export default function AdminDashboardCard({
  title,
  value,
  description,
  href,
  buttonText = "Yönet",
}) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
        boxShadow: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: 14,
            fontWeight: 600,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            mb: 1,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>

        {description ? (
          <Box mt={1}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        ) : null}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={Link}
          href={href}
          size="small"
          variant="contained"
          fullWidth
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
