"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Slide = {
  id: number;
  title: string;
  description: string;
  trailerUrl: string; // YouTube embed or local video
  posterUrl: string; // Fallback image if video doesn’t load
};

const slides: Slide[] = [
  {
    id: 3,
    title: "fvdv",
    description: "...",
    trailerUrl:
      "https://www.youtube.com/embed/9FYgZqzPLXc?autoplay=1&mute=1&loop=1",
    posterUrl: "...",
  },
];

export default function HeroSlider() {
  return (
    <div className="absolute inset-0 w-full h-[70vh] overflow-hidden  bg-[#2c3440]">
      <div className="absolute inset-0 bg-[#2c3440]/80 backdrop-blur-sm z-0" />

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 60000 }}
        loop
        className="h-full w-full bg-[#2c3440]"
        style={{
          backgroundColor: "#2c3440",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-full w-full bg-[#2c3440]"
            style={{
              backgroundColor: "#2c3440",
            }}
          >
            <div className="relative h-full w-full ">
              <iframe
                src={slide.trailerUrl}
                className=" w-full h-full object-cover object-"
                allow="autoplay; encrypted-media"
                style={{ border: "none" }}
              />
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(44, 52, 64, 0.3) 70%, rgba(44, 52, 64, 0.8) 100%)`,
              }}
            >
              {" "}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
