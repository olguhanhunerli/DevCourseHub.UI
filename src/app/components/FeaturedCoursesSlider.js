import { Box, IconButton, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
function NextArrow(props) {
  const { onClick } = props;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: -18,
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
        left: -18,
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

export default function FeaturedCoursesSlider({ courses = [] }) {
  const settings = {
    dots: true,
    infinite: courses.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
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

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 0, md: 2 },
        ".slick-list": {
          overflow: "hidden",
          mx: -1.5,
          py: 1,
        },
        ".slick-slide > div": {
          px: 1.5,
        },
        ".slick-dots": {
          bottom: -35,
        },
      }}
    >
      <Slider {...settings}>
        {courses.map((course) => (
          <Box key={course.id}>
            <CourseCard course={course} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
