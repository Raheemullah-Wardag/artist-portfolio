import Link from 'next/link';
import React, { useState } from 'react'
import SlideshowCard from './SlideshowCard';
import { portfolioItems } from '@/data/portfolio';

export const PortfolioGrid = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    // Function to handle the "Slide Down" / Load More
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4); // Reveal 4 more items
    };

    // Helper to determine the size of the card based on your pattern
    // Pattern: Small, Wide, Wide, Small (repeats every 4 items)
    const getSpanClass = (index) => {
        const position = index % 4;
        // On mobile (default): everything is full width
        // On medium screens (md): apply the bento layout
        if (position === 0) return "md:col-span-1"; // Image 1
        if (position === 1) return "md:col-span-2"; // Image 2
        if (position === 2) return "md:col-span-2"; // Image 3
        if (position === 3) return "md:col-span-1"; // Image 4
        return "md:col-span-1";
    };

    return (
        <div> {/* Main Gallery Container */}
            <main className="max-w-6xl mx-auto p-4 md:p-10">

                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                    {/* Loop only through the VISIBLE items */}
                    {portfolioItems.slice(0, visibleCount).map((item, index) => (
                        <Link
                            key={item.id}
                            href={`/art/${item.id}`}
                            // Apply the calculated span class here
                            className={`
                ${getSpanClass(index)} 
                group relative block overflow-hidden rounded-sm border border-gray-800 bg-gray-900 aspect-[4/3]
                animate-fadeIn
              `}
                        >
                            {/* Image with Zoom Effect */}
                            <SlideshowCard images={item.images} title={item.title} />
                            {/* Text Overlay (appears on hover) */}
                            <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-lg font-bold">{item.title}</h3>
                            </div>
                        </Link>
                    ))}

                </div>

                {/* The "Down Arrow" Button Area */}
                {visibleCount < portfolioItems.length && (
                    <div className="mt-12 flex flex-col items-center justify-center">
                        {/* The Line Effect */}
                        <div className="h-16 w-px bg-gradient-to-b from-transparent via-gray-500 to-white mb-4"></div>

                        <button
                            onClick={handleLoadMore}
                            className="flex flex-col items-center gap-2 group transition-all duration-300 hover:translate-y-2"
                        >
                            <span className="text-xs tracking-widest uppercase text-gray-500 group-hover:text-white">
                                View More
                            </span>
                            {/* Simple Arrow SVG */}
                            <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                        </button>
                        {/* Quick CSS for fade-in animation */}
                        <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
                    </div>
                )}

            </main></div>
    )
}
