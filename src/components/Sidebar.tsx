import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Scroll Spy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Active when section is near center
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false); // Close mobile menu on click
    }
  };

  return (
    <>
      {/* ================= DESKTOP SIDEBAR (Visible on lg+) ================= */}
      <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-end gap-4 z-50">
        {/* Vertical Margin Line */}
        <div className="absolute right-[-1px] top-0 bottom-0 w-px bg-gray-300 h-full" />

        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="group flex items-center gap-3 focus:outline-none pr-4 relative"
              aria-label={`Scroll to ${item.label}`}
            >
              {/* Label */}
              <span
                className={`
                  text-xs font-mono uppercase tracking-wider transition-all duration-300
                  ${isActive ? 'opacity-100 font-bold text-black' : 'opacity-0 group-hover:opacity-100 text-gray-500'}
                `}
              >
                {item.label}
              </span>

              {/* Indicator Dot/Dash */}
              <div className="relative flex items-center justify-center w-3">
                <span className={`
                  text-black font-mono text-lg leading-none transition-all duration-300
                  ${isActive ? 'opacity-100 scale-125' : 'opacity-50 scale-100 group-hover:opacity-100'}
                `}>
                  {isActive ? '•' : '-'}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* ================= MOBILE TOGGLE BUTTON (Visible on < lg) ================= */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-2 border-white focus:outline-none active:scale-90 transition-transform"
        >
          {isMobileOpen ? (
            <span className="font-mono text-xl">X</span>
          ) : (
            <span className="font-mono text-xs font-bold">IDX</span> // "IDX" for Index
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Card (Looks like an index card) */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="fixed bottom-24 right-6 w-64 bg-white border-2 border-black p-6 z-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:hidden"
            >
              <div className="border-b-2 border-black mb-4 pb-2">
                <h3 className="font-mono font-bold text-lg uppercase">Table of Contents</h3>
              </div>
              
              <div className="flex flex-col gap-3">
                {navItems.map((item, index) => {
                   const isActive = activeSection === item.id;
                   return (
                    <button
                      key={item.id}
                      onClick={() => handleScrollTo(item.id)}
                      className="text-left group flex items-center justify-between w-full focus:outline-none"
                    >
                      <span className={`font-mono text-sm ${isActive ? 'font-bold underline decoration-2' : 'text-gray-600'}`}>
                        {index + 1}. {item.label}
                      </span>
                      {isActive && <span className="text-xs font-mono animate-pulse">{'<'}</span>}
                    </button>
                   )
                })}
              </div>

              <div className="mt-6 pt-2 border-t border-dashed border-gray-400 text-center">
                 <span className="font-mono text-[10px] text-gray-400">VOL. 2024</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;