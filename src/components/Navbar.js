
"use client"
import Link from 'next/link';

export const Navbar = () => {
    return (
        // Removed the outer div wrapper to ensure sticky works properly
        <nav className="border-b border-gray-800 p-6 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
            {/* Home Link */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
                <h1 className="text-2xl font-bold tracking-tighter">ART.</h1>
            </Link>

            <ul className="flex gap-6 text-gray-400 text-sm">
                {/* <li>
                    <Link href="/" className="hover:text-white transition-colors">
                        Work
                    </Link>
                </li> */}
                <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}