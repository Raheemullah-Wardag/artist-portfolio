import { client } from "@/sanity/lib/client";
import { Navbar } from "@/components/Navbar";

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
    
      
      <main className="max-w-2xl mx-auto p-10 mt-20 text-center">
        <h1 className="text-5xl font-bold mb-6 tracking-tighter">Get in touch.</h1>
        <p className="text-gray-500 mb-12 text-lg">
            Open for commissions and collaborations.
        </p>

        {/* Email Section */}
        {profile?.email && (
            <div className="mb-12">
                <a 
                    href={`mailto:${profile.email}`} 
                    className="text-2xl md:text-4xl border-b border-gray-700 hover:border-white hover:text-white transition-all pb-2 text-gray-300"
                >
                    {profile.email}
                </a>
            </div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-10">
            {profile?.instagram && (
                <a href={profile.instagram} target="_blank" className="px-6 py-3 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all">
                    Instagram ↗
                </a>
            )}
            
            {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" className="px-6 py-3 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all">
                    LinkedIn ↗
                </a>
            )}
        </div>

      </main>
    </div>
  );
}