"use client"

import { useState } from 'react';
// Removed Link because we are using a Modal now
import SlideshowCard from '@/components/SlideshowCard';
import ArtModal from '@/components/ArtModal'; // Make sure you created this file from the previous step

export default function PortfolioGrid({ items }) { 
    const [visibleCount, setVisibleCount] = useState(4);
    
    // NEW: State for the Modal
    const [selectedItem, setSelectedItem] = useState(null);

    // Function to handle the "Slide Down" / Load More
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4); 
    };

    // YOUR EXACT LAYOUT LOGIC (Do not touch)
    const getSpanClass = (index) => {
        const position = index % 4;
        if (position === 0) return "md:col-span-1"; // Image 1
        if (position === 1) return "md:col-span-2"; // Image 2
        if (position === 2) return "md:col-span-2"; // Image 3
        if (position === 3) return "md:col-span-1"; // Image 4
        return "md:col-span-1";
    };

    return (
        <div> 
            {/* 1. THE MODAL (Only shows when an item is clicked) */}
            {selectedItem && (
                <ArtModal 
                    item={selectedItem} 
                    onClose={() => setSelectedItem(null)} 
                />
            )}

            {/* 2. Main Gallery Container (YOUR EXACT LAYOUT) */}
            <main className="max-w-6xl mx-auto p-4 md:p-10">

                {/* The Grid (YOUR EXACT GRID) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                    {items.slice(0, visibleCount).map((item, index) => (
                        <div
                            key={item._id}
                            // ACTION: Open Modal instead of Link
                            onClick={() => setSelectedItem(item)}
                            
                            // YOUR EXACT CLASSES + cursor-pointer
                            className={`
                                ${getSpanClass(index)} 
                                group relative block overflow-hidden rounded-sm border border-gray-800 bg-gray-900 aspect-[4/3]
                                animate-fadeIn cursor-pointer
                            `}
                        >
                            <SlideshowCard images={item.images} title={item.title} />
                            
                            {/* Text Overlay */}
                            <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                                <h3 className="text-lg font-bold">{item.title}</h3>
                            </div>
                        </div>
                    ))}

                </div>

                {/* The "Down Arrow" Button Area */}
                {visibleCount < items.length && (
                    <div className="mt-12 flex flex-col items-center justify-center">
                        <div className="h-16 w-px bg-gradient-to-b from-transparent via-gray-500 to-white mb-4"></div>

                        <button
                            onClick={handleLoadMore}
                            className="flex flex-col items-center gap-2 group transition-all duration-300 hover:translate-y-2"
                        >
                            <span className="text-xs tracking-widest uppercase text-gray-500 group-hover:text-white">
                                View More
                            </span>
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
                    </div>
                )}
                
                
            </main>
        </div>
    )
}