"use client"; // Required because we need onClick and State

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import { PortfolioGrid } from '@/components/PortfolioGrid';

export default function Portfolio() {
  
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      
     

     <PortfolioGrid/>
      {/* Footer Placeholder */}
      

    
    </div>
  );
}