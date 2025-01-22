"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Slide {
  id: number;
  imageSrc: string;
  alt?: string;
}

const slides: Slide[] = [
  { id: 1, imageSrc: "/carousel/slice.svg", alt: "First slide" },
  { id: 2, imageSrc: "/carousel/slice1.svg", alt: "Second slide" },
  { id: 3, imageSrc: "/carousel/slice.svg", alt: "Third slide" },
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    },
    [nextSlide, prevSlide]
  );

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("keydown", handleKeyDown);
      return () => slider.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full min-h-[18rem] md:min-h-[24rem] rounded-lg overflow-hidden mx-auto mt-12 md:mt-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="region"
      aria-label="Image slider"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full h-full"
            role="group"
            aria-label={`Slide ${slide.id} of ${slides.length}`}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.alt || `Slide ${slide.id}`}
              className="w-full object-cover mx-auto select-none"
              width={540}
              height={480}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute inset-y-0 left-0 flex justify-center items-center w-10 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:hover:bg-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute inset-y-0 right-0 flex justify-center items-center w-10 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:hover:bg-white/10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div
        className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2"
        role="tablist"
        aria-label="Slider pagination"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              currentSlide === index
                ? "bg-pink-600"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            role="tab"
            aria-selected={currentSlide === index}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
