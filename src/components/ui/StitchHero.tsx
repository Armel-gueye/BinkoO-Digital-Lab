import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { openWhatsApp } from '@/utils/whatsapp';

export const StitchHero: React.FC = () => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const chatBtnRef = useRef<HTMLButtonElement>(null);

    const handleWhatsAppClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openWhatsApp();
    };

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.setProperty('--mx', (x * 0.2) + 'px');
            btn.style.setProperty('--my', (y * 0.2) + 'px');
        };

        const handleMouseLeave = () => {
            btn.style.setProperty('--mx', '0px');
            btn.style.setProperty('--my', '0px');
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleChatClick = () => {
        const chatWindow = document.getElementById('binkoo-chat-window');
        if (chatWindow) {
            chatWindow.classList.toggle('active');

            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (!isMobile) {
                setTimeout(() => {
                    const input = document.getElementById('binkoo-chat-input');
                    if (input) input.focus();
                }, 100);
            }
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white dark:bg-[#0a0a0a] font-slab lg:text-left text-left">
            <header className="absolute top-0 left-0 w-full z-50 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="mx-auto w-full px-8 py-8 md:px-16 md:py-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 select-none">
                            <div className="h-6 w-6 text-primary">
                                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">BinkoO</h2>
                        </div>

                        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 animate-nav-reveal">
                            <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/">Accueil</Link>

                            <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/services">Services</Link>
                            <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/blog">Blog</Link>
                            <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/realisations">Portfolio</Link>
                            <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/a-propos">À Propos</Link>
                            <Link className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-colors duration-200" to="/contact">Contact</Link>
                        </nav>

                        <button className="lg:hidden p-2 text-black dark:text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex grow flex-col justify-center px-8 md:px-16 pt-24 pb-12 relative">
                <div className="grid grid-cols-12 gap-8 h-full w-full max-w-[1600px] mx-auto relative">
                    <div className="col-span-12 lg:col-span-7 flex flex-col justify-center z-10">
                        <div className="relative">
                            <div className="w-12 h-1 bg-primary mb-8 ml-1 animate-fade-in" style={{ animationDelay: '200ms' }}></div>
                            <h1 aria-label="L'IA et le digital ne sont plus une option." className="text-black dark:text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight -ml-1 mb-4 flex flex-wrap">
                                <span className="char-span animate-letter" style={{ animationDelay: '300ms' }}>L</span><span className="char-span animate-letter" style={{ animationDelay: '330ms' }}>'</span><span className="char-span animate-letter" style={{ animationDelay: '360ms' }}>I</span><span className="char-span animate-letter" style={{ animationDelay: '390ms' }}>A</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '420ms' }}>e</span><span className="char-span animate-letter" style={{ animationDelay: '450ms' }}>t</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '480ms' }}>l</span><span className="char-span animate-letter" style={{ animationDelay: '510ms' }}>e</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '540ms' }}>d</span><span className="char-span animate-letter" style={{ animationDelay: '570ms' }}>i</span><span className="char-span animate-letter" style={{ animationDelay: '600ms' }}>g</span><span className="char-span animate-letter" style={{ animationDelay: '630ms' }}>i</span><span className="char-span animate-letter" style={{ animationDelay: '660ms' }}>t</span><span className="char-span animate-letter" style={{ animationDelay: '690ms' }}>a</span><span className="char-span animate-letter" style={{ animationDelay: '720ms' }}>l</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '750ms' }}>n</span><span className="char-span animate-letter" style={{ animationDelay: '780ms' }}>e</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '810ms' }}>s</span><span className="char-span animate-letter" style={{ animationDelay: '840ms' }}>o</span><span className="char-span animate-letter" style={{ animationDelay: '870ms' }}>n</span><span className="char-span animate-letter" style={{ animationDelay: '900ms' }}>t</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '930ms' }}>p</span><span className="char-span animate-letter" style={{ animationDelay: '960ms' }}>l</span><span className="char-span animate-letter" style={{ animationDelay: '990ms' }}>u</span><span className="char-span animate-letter" style={{ animationDelay: '1020ms' }}>s</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '1050ms' }}>u</span><span className="char-span animate-letter" style={{ animationDelay: '1080ms' }}>n</span><span className="char-span animate-letter" style={{ animationDelay: '1110ms' }}>e</span>
                                <span className="char-span"> </span>
                                <span className="char-span animate-letter" style={{ animationDelay: '1140ms' }}>o</span><span className="char-span animate-letter" style={{ animationDelay: '1170ms' }}>p</span><span className="char-span animate-letter" style={{ animationDelay: '1200ms' }}>t</span><span className="char-span animate-letter" style={{ animationDelay: '1230ms' }}>i</span><span className="char-span animate-letter" style={{ animationDelay: '1260ms' }}>o</span><span className="char-span animate-letter" style={{ animationDelay: '1290ms' }}>n</span><span className="char-span animate-letter" style={{ animationDelay: '1320ms' }}>.</span>
                            </h1>
                            <h2 className="text-black dark:text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.2] tracking-normal opacity-80 animate-reveal-up" style={{ animationDelay: '1400ms' }}>
                                Ce sont vos nouveaux leviers de croissance.
                            </h2>
                        </div>
                        <div className="mt-12 lg:mt-16 max-w-xl ml-1">
                            <p className="text-lg font-bold text-black dark:text-white mb-4 animate-reveal-up" style={{ animationDelay: '1550ms' }}>
                                Le digital n'est pas l'avenir. C'est le présent. Et il commence avec vous.
                            </p>
                            <p className="text-sm md:text-base font-normal leading-relaxed text-gray-700 dark:text-gray-300 mb-8 border-l-2 border-primary/20 pl-4 animate-reveal-up" style={{ animationDelay: '1700ms' }}>
                                Chez BinkoO Digital Lab, nous aidons les entreprises, marques et entrepreneurs à automatiser, vendre et se développer plus vite grâce à des outils simples, intelligents et accessibles.
                            </p>
                            <div className="flex items-center gap-6 animate-reveal-up" style={{ animationDelay: '1850ms' }}>
                                <button ref={btnRef} onClick={handleWhatsAppClick} className="magnetic-btn group relative flex h-14 min-w-[180px] cursor-pointer items-center justify-center overflow-hidden bg-primary px-8 text-white transition-all hover:bg-red-700 rounded-full shadow-lg shadow-red-500/20 animate-breathing border-none">
                                    <span className="relative z-10 text-sm font-bold uppercase tracking-widest text-white">Devis Gratuit</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-6 mt-8 animate-reveal-up" style={{ animationDelay: '2000ms' }}>
                                <a aria-label="Facebook" className="text-black dark:text-white hover:text-primary transition-colors duration-300 transform hover:scale-110" href="https://www.facebook.com/share/1JPaSH1STA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.641c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"></path></svg>
                                </a>
                                <a aria-label="LinkedIn" className="text-black dark:text-white hover:text-primary transition-colors duration-300 transform hover:scale-110" href="https://www.linkedin.com/company/binkoo-digital-lab" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                                </a>
                                <a aria-label="TikTok" className="text-black dark:text-white hover:text-primary transition-colors duration-300 transform hover:scale-110" href="https://www.tiktok.com/@binkoo.digital.lab?_t=ZM-90kNEp9sTGt&_r=1" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.36-3.8 2.03-5.85 1.79-2.05-.23-3.87-1.42-5.06-3.08C1.6 17.5 1.5 15.17 2.34 13.2c.84-1.96 2.5-3.43 4.6-3.9 1.05-.24 2.14-.14 3.19.04V13.6c-.6-.52-1.4-.76-2.2-.62-.77.13-1.47.53-1.95 1.1-.48.57-.69 1.33-.55 2.07.14.73.61 1.38 1.25 1.73.65.34 1.41.36 2.07.03.66-.33 1.14-.92 1.27-1.65.04-.25.05-.5.02-.75.03-3.04.02-6.08.02-9.12.02-1.87.03-3.74.02-5.61.16 0 .32.01.48.01z"></path></svg>
                                </a>
                                <a aria-label="Instagram" className="text-black dark:text-white hover:text-primary transition-colors duration-300 transform hover:scale-110" href="https://www.instagram.com/binkoo_digital_lab?igsh=MXcyYjRpbHBrbjh1ag%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:col-span-5 lg:flex flex-col justify-center items-end relative pl-8">
                        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 writing-vertical-rl rotate-180 select-none z-10 animate-fade-in" style={{ animationDelay: '2200ms', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                            <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 dark:text-gray-600 whitespace-nowrap">
                                <span className="text-primary">●</span>   Automatisez   —   Innovez   —   Accélérez
                            </p>
                        </div>
                        <div className="relative w-full aspect-[4/5] max-w-md shadow-2xl rounded-[2.5rem] overflow-hidden group mr-28 animate-scale-in" style={{ animationDelay: '800ms' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                            <img
                                alt="Abstract digital neural network nodes glowing"
                                className="h-full w-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                                src="https://i.postimg.cc/t41tBmDr/Image-robot-de-Binko-O-Digital-Lab.webp"
                                width={800}
                                height={1000}
                                loading="eager"
                                decoding="async"
                                fetchpriority="high"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20">
                                <span className="block text-xs font-bold uppercase tracking-widest text-white/90 mb-1">
                                    BinkoO Digital Lab
                                </span>
                                <div className="h-1 w-8 bg-primary rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="hidden md:flex justify-between items-end px-16 py-8 fixed bottom-0 left-0 w-full pointer-events-none z-0">
            </div>

            <button
                ref={chatBtnRef}
                onClick={handleChatClick}
                aria-label="Open Chat"
                className="fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-red-500/20 transition-all duration-300 hover:scale-110 focus:outline-none animate-fade-in group border-none" style={{ animationDelay: '2400ms' }}>
                <div className="animate-wiggle w-full h-full flex items-center justify-center group-hover:animate-glow-pulse rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="currentColor">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                    </svg>
                </div>
            </button>
        </div>
    );
};
