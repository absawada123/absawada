import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full font-mono mt-20 pb-8 px-4">
      {/* Perforated Tear-Off Line */}
      <div className="w-full border-t-2 border-dashed border-gray-300 mb-8 relative">
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#fafafa] px-4 text-xs text-gray-400 uppercase tracking-widest">
          End of Page
        </span>
        {/* Scissors Icon (Optional CSS shape or just text) */}
        <div className="absolute -left-1 -top-2.5 text-gray-300 text-xs transform -rotate-90">✂</div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        
        {/* Column 1: Branding */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h3 className="font-bold text-black uppercase tracking-tighter text-lg">AB Sawada</h3>
          <p className="text-xs leading-relaxed max-w-xs mx-auto md:mx-0">
            Crafting digital experiences with code, creativity, and a touch of retro aesthetics.
          </p>
        </div>

        {/* Column 2: Tech Stack (The "Ink & Paper") */}
        <div className="flex flex-col gap-2 text-center">
          <h4 className="font-bold uppercase text-xs text-gray-400 mb-1">Built With</h4>
          <p className="text-xs">
            Next.js • Tailwind CSS • Framer Motion • TypeScript
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            Deployed on Vercel
          </p>
        </div>

        {/* Column 3: Meta Info */}
        <div className="flex flex-col gap-2 text-center md:text-right">
          <p className="font-bold text-black">© {currentYear} All Rights Reserved.</p>
          <p className="text-xs">
            Calamba City, Philippines <span className="mx-1">|</span> GMT+8
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
            Vol. 1.0.0
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-12">
        <p className="text-[10px] text-gray-300 uppercase tracking-[0.3em]">
          Designed & Developed by AB Sawada
        </p>
      </div>
    </footer>
  );
};

export default Footer;