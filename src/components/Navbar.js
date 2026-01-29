
"use client"
export const Navbar = () => {
    return (
        <div className=" bg-black text-white font-sans selection:bg-white selection:text-black">

            {/* Navbar Placeholder */}
            <nav className="border-b border-gray-800 p-6 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
                <h1 className="text-2xl font-bold tracking-tighter">MY ART.</h1>
                <ul className="flex gap-6 text-gray-400 text-sm">
                    <li className="hover:text-white cursor-pointer">Work</li>
                    <li className="hover:text-white cursor-pointer">About</li>
                    <li className="hover:text-white cursor-pointer">Contact</li>
                </ul>
            </nav>
        </div>
    )
}
