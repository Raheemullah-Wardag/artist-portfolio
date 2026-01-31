import { client } from "@/sanity/lib/client";

export const revalidate = 60; 

export default async function AboutPage() {
  const profile = await client.fetch(`
    *[_type == "profile"][0]{
      headline,
      bio,
      "imageUrl": profileImage.asset->url
    }
  `);

  return (
    // Added 'overflow-x-hidden' to strictly prevent horizontal scroll
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
    
     
      {/* 
         LAYOUT FIXES:
         1. w-full: Ensures it fits the screen width.
         2. px-5: Smaller side padding on mobile (p-10 was too big).
         3. pt-28: Extra top padding so content is not hidden behind Navbar.
      */}
      <main className="w-full max-w-4xl mx-auto px-5 pt-28 pb-10 md:p-10 md:mt-10">
        
        {/* Flex Col on Mobile, Row on Desktop */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          
          {/* Profile Image */}
          {profile?.imageUrl && (
            <div className="
                w-full max-w-[280px] md:max-w-none md:w-1/3 
                aspect-square relative overflow-hidden rounded-sm border border-gray-800 
                shadow-2xl flex-shrink-0
            ">
               <img 
                 src={profile.imageUrl} 
                 alt="Artist" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
               />
            </div>
          )}

          {/* Text Content */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">About.</h1>
            
            {profile?.headline && (
                <h2 className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 font-light italic break-words">
                    {profile.headline}
                </h2>
            )}

            {/* whitespace-pre-wrap preserves paragraphs, break-words prevents overflow */}
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base break-words">
              {profile?.bio || "Bio coming soon..."}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}