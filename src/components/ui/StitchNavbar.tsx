
import React from 'react';
import { Link } from 'react-router-dom';

export const StitchNavbar: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 animate-fade-in bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
            <div className="mx-auto w-full px-8 py-4 md:px-16 md:py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 select-none">
                        <div className="h-6 w-6 text-primary">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-black dark:text-white font-slab">BinkoO</h2>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8 xl:gap-12 animate-nav-reveal font-slab">
                        <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/">Accueil</Link>
                        <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/services">Services</Link>
                        <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/blog">Blog</Link>
                        <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/realisations">Portfolio</Link>
                        <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/a-propos">À Propos</Link>
                        <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/contact">Contact</Link>
                    </nav>

                    {/* Placeholder for symmetry or future actions if needed */}
                    <div className="hidden lg:block w-6"></div>
                </div>
            </div>
        </header>
    );
};
