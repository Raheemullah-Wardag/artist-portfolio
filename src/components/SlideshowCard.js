"use client";
import { useState } from "react";

export default function SlideshowCard({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to change slide
  const goToSlide = (e, index) => {
    e.preventDefault(); // Prevents the Link from opening the detail page
    e.stopPropagation(); // Double check to stop bubbling
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full group">
      
      {/* The Image */}
      <img
        src={images[currentIndex]}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
      />

      {/* The Dots Container */}
      {/* Only show dots if there is more than 1 image */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={(e) => goToSlide(e, slideIndex)}
              // Styling: 
              // If active: White filled circle
              // If inactive: Transparent with white border
              className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${
                currentIndex === slideIndex 
                  ? "bg-white scale-110" 
                  : "bg-black/50 hover:bg-white/50"
              }`}
              aria-label={`Go to image ${slideIndex + 1}`}
            />
          ))}
        </div>
      )}

      {/* Dark Gradient at bottom so dots are always visible */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
}