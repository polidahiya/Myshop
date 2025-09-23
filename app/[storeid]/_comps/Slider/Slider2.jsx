"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, Autoplay, Parallax } from "swiper/modules"; // Import Controller module
import "swiper/css";
import Linkgenerator from "./Linkgenerator";

const imageDimensions = {
  mobile: { width: 390, height: 390 },
  tablet: { width: 600, height: 600 },
  desktop: { width: 1000, height: 1000 },
};

export default function Slider2({ device = "desktop", storeid, items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  // Sync controllers after both swipers are initialized
  useEffect(() => {
    if (textSwiperRef.current && imageSwiperRef.current) {
      textSwiperRef.current.controller.control = imageSwiperRef.current;
      imageSwiperRef.current.controller.control = textSwiperRef.current;
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 aspect-[2/1]">
        <Swiper
          onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
          modules={[Navigation, Autoplay, Parallax, Controller]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          speed={1300}
          parallax={true}
          className="w-full h-full"
        >
          {items.map((item, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              <Nextimage
                height={imageDimensions[device].height}
                width={imageDimensions[device].width}
                quality={100}
                src={item?.img}
                alt={item?.title}
                priority={i == 0 ? true : false}
                loading={i == 0 ? "eager" : "lazy"}
                className={`h-full aspect-[2/1] ${
                  item?.cover ? "object-cover" : "object-contain"
                }`}
              ></Nextimage>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Second Swiper (with controls) */}
      <div className="relative w-full lg:w-1/2 aspect-[2/1] bg-[var(--theme)]">
        <Swiper
          onSwiper={(swiper) => (textSwiperRef.current = swiper)}
          modules={[Navigation, Autoplay, Parallax, Controller]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          speed={1300}
          parallax={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full bg-theme"
        >
          {items.map((item, index) => {
            const link = Linkgenerator(item, storeid);

            return (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className="w-full h-full px-14 flex flex-col items-center justify-center bg-theme text-white py-10"
                >
                  <h2
                    className="text-4xl font-tenor w-full min-w-full text-center line-clamp-1"
                    data-swiper-parallax="-150"
                  >
                    {item?.title}
                  </h2>
                  <p
                    className="mt-3 w-full min-w-full text-sm lg:text-base text-center line-clamp-1"
                    data-swiper-parallax="-300"
                  >
                    {item?.desc}
                  </p>

                  {/* item in the link with delay */}
                  <div
                    className="w-full min-w-full mt-3 flex items-center justify-center"
                    data-swiper-parallax="-450"
                  >
                    <Link
                      href={link}
                      className="bg-white text-[var(--theme)] px-10 py-4 border block w-fit border-white lg:hover:bg-transparent lg:hover:text-white duration-300"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="hidden absolute left-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square text-white md:flex items-center justify-center z-10"
          onClick={() => textSwiperRef.current?.slidePrev()}
          aria-label="Scroll Left"
          title="Scroll Left"
        >
          <FaAngleLeft />
        </button>
        <button
          className="hidden absolute right-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square text-white md:flex items-center justify-center rotate-180 z-10"
          onClick={() => textSwiperRef.current?.slideNext()}
          aria-label="Scroll Right"
          title="Scroll Right"
        >
          <FaAngleLeft />
        </button>

        {/* custom pagination */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
          {items.map((_, i) => (
            <button
              key={i}
              className={`flex items-center justify-center p-1`}
              onClick={() => {
                if (textSwiperRef.current) textSwiperRef.current.slideToLoop(i);
              }}
              aria-label="Index"
              title="Index"
            >
              <span
                className={`block h-1 rounded-full bg-white duration-150 ${
                  i === activeIndex ? "w-8" : "w-1"
                }`}
              ></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
