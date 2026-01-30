"use client";
import { useState, useEffect } from "react";

export default function ArtModal({ item, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State for Swipe Logic
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // --- NAVIGATION LOGIC ---
  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  // --- KEYBOARD SUPPORT (Esc to Close, Arrows to Slide) ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, item.images.length]); // Dependencies ensure fresh state

  // --- SWIPE LOGIC ---
  const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  if (!item) return null;

  // Format Date
  const dateStr = new Date(item._createdAt).toLocaleDateString("en-US", {
    month: "long", year: "numeric",
  });

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      
      {/* Card Container */}
      <div 
        className="relative bg-[#0a0a0a] border border-gray-800 rounded-xl w-full max-w-6xl h-[85vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          ✕
        </button>

        {/* --- LEFT SIDE: IMAGE SLIDER --- */}
        <div 
          className="w-full md:w-[70%] h-1/2 md:h-full bg-black flex items-center justify-center relative group"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
             {/* The Image */}
             <img 
               src={item.images[currentIndex]} 
               alt={item.title}
               className="max-w-full max-h-full object-contain shadow-lg select-none"
             />

             {/* Navigation Arrows (Only if > 1 image) */}
             {item.images.length > 1 && (
               <>
                 {/* Left Arrow */}
                 <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                 </button>

                 {/* Right Arrow */}
                 <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                 </button>

                 {/* Pagination Dots */}
                 <div className="absolute bottom-4 flex gap-2">
                    {item.images.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-gray-600'}`}
                      />
                    ))}
                 </div>
               </>
             )}
        </div>

        {/* --- RIGHT SIDE: DETAILS --- */}
        <div className="w-full md:w-[30%] h-1/2 md:h-full bg-[#111] p-6 md:p-8 flex flex-col overflow-y-auto border-l border-gray-800">
          
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
            {item.category || "Art Piece"}
          </span>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            {item.title}
          </h2>

          <div className="w-12 h-1 bg-white mb-6 opacity-20"></div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 font-light">
            {item.description || "No description provided."}
          </p>

          <div className="mt-auto pt-6 border-t border-gray-800">
             <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
               Created
             </p>
             <p className="text-white text-sm font-medium">{dateStr}</p>
          </div>
        </div>

      </div>
    </div>
  );
}