import { client } from "@/sanity/lib/client";
import { Navbar } from "@/components/Navbar";

export const revalidate = 60; // Refresh data every 60 seconds

export default async function AboutPage() {
  // Fetch the first profile document found
  const profile = await client.fetch(`
    *[_type == "profile"][0]{
      headline,
      bio,
      "imageUrl": profileImage.asset->url
    }
  `);

  return (
    <div className="bg-black/80 backdrop-blur-md z-50 min-h-screen bg-black text-white font-sans">
     
      <main className="max-w-4xl mx-auto p-10 mt-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Profile Image */}
          {profile?.imageUrl && (
            <div className="w-full md:w-1/3 aspect-square relative overflow-hidden rounded-sm border border-gray-800">
               <img 
                 src={profile.imageUrl} 
                 alt="Artist" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
               />
            </div>
          )}

          {/* Text Content */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">About.</h1>
            
            {profile?.headline && (
                <h2 className="text-xl text-gray-400 mb-8 font-light italic">
                    {profile.headline}
                </h2>
            )}

            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {profile?.bio || "Bio coming soon..."}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}