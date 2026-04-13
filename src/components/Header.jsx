import Link from 'next/link';
import { useState } from 'react';

'use client';


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        BookTrack
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:space-x-8 absolute md:static top-16 left-0 right-0 md:top-auto bg-white md:bg-transparent shadow md:shadow-none`}>
                        <Link href="/" className="block md:inline-block px-4 md:px-0 py-2 md:py-0 text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/books" className="block md:inline-block px-4 md:px-0 py-2 md:py-0 text-gray-700 hover:text-blue-600">
                            Books
                        </Link>
                        <Link href="/about" className="block md:inline-block px-4 md:px-0 py-2 md:py-0 text-gray-700 hover:text-blue-600">
                            About
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}