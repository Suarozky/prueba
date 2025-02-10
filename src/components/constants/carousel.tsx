"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  imageSrc: string;
  alt?: string;
}

const slides: Slide[] = [
  { id: 1, imageSrc: "/carousel/Slice 2.png", alt: "First slide" },
  { id: 2, imageSrc: "/carousel/Slice 3.png", alt: "Second slide" },
  { id: 3, imageSrc: "/carousel/Slice 2.png", alt: "Third slide" },
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
    stopAutoPlay(); // Clear any existing interval
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
      className="relative w-full h-full overflow-hidden"
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
            className="flex-shrink-0 w-screen h-full"
            role="group"
            aria-label={`Slide ${slide.id} of ${slides.length}`}
          >
            <img
              src={slide.imageSrc}
              alt={slide.alt || `Slide ${slide.id}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute inset-y-0 left-0 flex justify-center items-center w-16 h-full text-white bg-white/30 hover:bg-black/10 transition-colors focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute inset-y-0 right-0 flex justify-center items-center w-16 h-full text-white bg-white/30 hover:bg-black/10 transition-colors focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div
        className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2"
        role="tablist"
        aria-label="Slider pagination"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-colors focus:outline-none ${
              currentSlide === index
                ? "bg-pink-600"
                : "bg-white/50 hover:bg-white/70"
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