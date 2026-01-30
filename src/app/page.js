
import { client } from "@/sanity/lib/client"; 

import PortfolioGrid from '@/components/PortfolioGrid';

// GROQ Query: Get data and convert image objects to URL strings
const query = `*[_type == "portfolio"] | order(_createdAt desc) {
  _id,
  title,
  category,
  description, 
  _createdAt,
  "images": images[].asset->url 
}`;
// Refresh data every 60 seconds (optional, but good for caching)
export const revalidate = 60;

export default async function Home() {
  // 1. Fetch data from Sanity
  const portfolioItems = await client.fetch(query);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
     
      
      <main className="w-full max-w-[1800px] mx-auto p-4 md:p-10">
        {/* 2. Pass the data to the Client Component */}
        <PortfolioGrid items={portfolioItems} />
      </main>

    </div>
  );
}