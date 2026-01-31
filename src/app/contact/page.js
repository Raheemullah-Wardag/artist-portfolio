
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await client.fetch(`
    *[_type == "profile"][0]{
      email,
      instagram,
      linkedin
    }
  `);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
    

      <main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 pt-24 sm:pt-28 text-center">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tighter">
          Get in touch.
        </h1>

        <p className="text-gray-500 mb-8 sm:mb-12 text-base sm:text-lg">
          Open for commissions and collaborations.
        </p>

        {/* Email Section */}
        {profile?.email && (
          <div className="mb-10 sm:mb-12 break-words">
            <a
              href={`mailto:${profile.email}`}
              className="text-lg sm:text-2xl md:text-4xl border-b border-gray-700 
                         hover:border-white hover:text-white transition-all pb-1 sm:pb-2 
                         text-gray-300 inline-block"
            >
              {profile.email}
            </a>
          </div>
        )}

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6 sm:mt-10">
          
          {profile?.instagram && (
            <a
              href={profile.instagram}
              target="_blank"
              className="px-5 py-3 border border-gray-800 rounded-full 
                         hover:bg-white hover:text-black transition-all text-sm sm:text-base"
            >
              Instagram ↗
            </a>
          )}

          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              className="px-5 py-3 border border-gray-800 rounded-full 
                         hover:bg-white hover:text-black transition-all text-sm sm:text-base"
            >
              LinkedIn ↗
            </a>
          )}

        </div>
      </main>
    </div>
  );
}
