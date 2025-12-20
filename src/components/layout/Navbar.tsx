'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 w-full bg-[#f8fafb] border-b border-gray-200 z-50 backdrop-blur-sm bg-opacity-95 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="absolute left-12 top-0 w-px bg-gray-200 h-full"></div>
      <div className="absolute left-301.5 top-0 w-px bg-gray-200 h-full"></div> 
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-20 py-4">
        <div className="flex items-center">
          <img 
            src="/logo pagina.png" 
            alt="Ikell" 
            className="h-6 sm:h-8 w-auto"
          />
        </div>

        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm text-gray-600">
          <a className="hover:text-gray-900 transition-colors" href="#hero">Inicio</a>
          <a className="hover:text-gray-900 transition-colors" href="#steps">Características</a>
          <a className="hover:text-gray-900 transition-colors" href="#quicksetup">Dashboard</a>
          <a className="hover:text-gray-900 transition-colors" href="#contact">Contacto</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="/login" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Log in
          </a>
          <button className="rounded-full bg-black text-white px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-800 transition-colors">
            Start for free
          </button>
        </div>
      </div>
    </header>
  )
}
