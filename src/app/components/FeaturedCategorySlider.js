"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, CircularProgress, IconButton, Chip } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Slider from "react-slick";
import { toast } from "sonner";
import { categoryService } from "@/services/categoryService";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { onClick } = props;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: -45,
        top: "40%",
        transform: "translateY(-50%)",
        zIndex: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
    >
      <ChevronRight />
    </IconButton>
  );
}

function PrevArrow(props) {
  const { onClick } = props;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: -45,
        top: "40%",
        transform: "translateY(-50%)",
        zIndex: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
    >
      <ChevronLeft />
    </IconButton>
  );
}

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: categories.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 0, md: 2 },
        ".slick-list": {
          overflow: "hidden",
          mx: -1,
          py: 1,
        },
        ".slick-slide > div": {
          px: 1,
        },
        ".slick-dots": {
          bottom: -35,
        },
      }}
    >
      <Slider {...settings}>
        {categories.map((category) => (
          <Box key={category.id}>
            <Chip
              label={category.name}
              clickable
              component={Link}
              href={`/category/${encodeURIComponent(category.name)}`}
              sx={{
                width: "100%",
                height: 56,
                fontSize: "0.95rem",
                borderRadius: 999,
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
