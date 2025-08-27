// src/components/Preloader.tsx
import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-paper-white flex items-center justify-center z-50" style={{ perspective: '1000px' }}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-paper-white animate-[paperFlip_1.5s_ease-in-out_forwards]">
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="font-mono text-dark-gray text-lg md:text-xl overflow-hidden whitespace-nowrap border-r-4 border-r-dark-gray animate-[typing_1s_steps(30,end)_0.5s_forwards]">
              &gt; Initializing portfolio...
            </div>
            <div className="font-mono text-dark-gray text-lg md:text-xl overflow-hidden whitespace-nowrap border-r-4 border-r-dark-gray animate-[typing_1s_steps(30,end)_1.5s_forwards] opacity-0" style={{ animationFillMode: 'forwards' }}>
              &gt; Loading assets...
            </div>
            <div className="font-mono text-dark-gray text-lg md:text-xl overflow-hidden whitespace-nowrap border-r-4 border-r-dark-gray animate-[typing_0.5s_steps(15,end)_2.5s_forwards] opacity-0" style={{ animationFillMode: 'forwards' }}>
              &gt; Ready.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;