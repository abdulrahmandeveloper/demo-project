"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { GetSlideShowVidoes } from "@/shared/services/tmdb/tmdb.service";

export default function HeroSlider() {
  const [reccomendationVideos, setReccomendationVideos] = useState<string[]>(
    []
  );

  console.log("reccomendationVideos: ", reccomendationVideos);

  useEffect(() => {
    const fetchRecomendations = async () => {
      const data = await GetSlideShowVidoes(157336, 1405, 1);
      setReccomendationVideos(data);
    };

    fetchRecomendations();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-[70vh] overflow-hidden  bg-[#2c3440]">
      <div className="absolute inset-0 bg-[#2c3440]/80 backdrop-blur-sm z-0" />

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 15000 }}
        loop={reccomendationVideos.length > 1}
        className="h-full w-full bg-[#2c3440]"
        style={{
          backgroundColor: "#2c3440",
        }}
      >
        {reccomendationVideos.map((url, key) => (
          <SwiperSlide
            key={key}
            className="relative h-full w-full bg-[#2c3440]"
            style={{
              backgroundColor: "#2c3440",
            }}
          >
            <div className="relative h-full w-full ">
              <iframe
                key={key}
                src={url}
                className=" w-full h-full object-cover"
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
