
"use client";
import { useState } from "react";

export default function SlideshowCard({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State for Touch (Swipe) logic
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) to register a slide change
  const minSwipeDistance = 50;

  // --- NAVIGATION LOGIC ---

  const nextSlide = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (e, index) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // --- SWIPE LOGIC (Mobile) ---

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swiped Left -> Show Next
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      // Swiped Right -> Show Previous
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div 
      className="relative w-full h-full group"
      // Add touch listeners to the main container
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* The Image */}
      <img
        src={images[currentIndex]}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 select-none"
      />

      {/* --- ARROWS & DOTS (Only if > 1 image) --- */}
      {images.length > 1 && (
        <>
          {/* LEFT ARROW (Hidden on mobile, Visible on Desktop Hover) */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black z-20 hidden md:flex"
            aria-label="Previous Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* RIGHT ARROW (Hidden on mobile, Visible on Desktop Hover) */}
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black z-20 hidden md:flex"
            aria-label="Next Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* DOTS (Visible always) */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {images.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={(e) => goToSlide(e, slideIndex)}
                className={`w-2 h-2 rounded-full border border-white transition-all duration-300 ${
                  currentIndex === slideIndex 
                    ? "bg-white scale-125" 
                    : "bg-transparent opacity-60 hover:opacity-100 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${slideIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Dark Gradient at bottom for text readability */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
    </div>
  );
}