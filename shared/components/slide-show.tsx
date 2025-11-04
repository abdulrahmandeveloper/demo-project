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
    id: 1,
    title: "Breaking Bad",
    description: "A chemistry teacher turned meth producer.",
    trailerUrl:
      "https://www.youtube.com/embed/HhesaQXLuRY?autoplay=1&mute=1&loop=1",
    posterUrl: "/images/breaking-bad.jpg",
  },
  {
    id: 2,
    title: "Stranger Things",
    description: "Dark secrets lurk beneath Hawkins, Indiana.",
    trailerUrl:
      "https://www.youtube.com/embed/b9EkMc79ZSU?autoplay=1&mute=1&loop=1",
    posterUrl: "/images/stranger-things.jpg",
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full h-[70vh] overflow-hidden relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 60000 }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <iframe
                src={slide.trailerUrl}
                className="absolute top-0 left-0 w-full h-full object-cover"
                allow="autoplay; encrypted-media"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
