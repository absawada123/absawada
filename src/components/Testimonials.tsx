import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

// Placeholder data - You can update these with real reviews later
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: "The application's UI is professionally made",
    author: "Robert B.",
    role: "Lead Software & Sale Manager"
  },
  
];

const TypewriterCard = ({ data, isVisible, delay }: { data: Testimonial; isVisible: boolean; delay: number }) => {
  const [text, setText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (isVisible) {
      // Wait for the stagger delay before starting to type
      timeout = setTimeout(() => {
        let currentIndex = 0;
        setText(''); // Reset text before starting
        
        interval = setInterval(() => {
          if (currentIndex < data.quote.length) {
            setText((prev) => data.quote.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsDone(true);
          }
        }, 30); // Typing speed (ms per character)

      }, delay);
    } else {
      // Reset if scrolled out of view
      setText('');
      setIsDone(false);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isVisible, data.quote, delay]);

  return (
    <div className="flex flex-col justify-between h-full p-6 md:p-8 relative bg-white">
      {/* Large background quote mark for newspaper style */}
      <span className="absolute top-4 left-4 text-6xl font-serif text-gray-100 select-none -z-10">
        &ldquo;
      </span>

      <div className="mb-6 relative z-10">
        <p className="text-sm md:text-base font-mono leading-relaxed min-h-[100px]">
          {text}
          {!isDone && isVisible && <span className="animate-blink font-bold">|</span>}
        </p>
      </div>
      
      {/* Author info fades in only after typing is complete */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 10 }}
        transition={{ duration: 0.5 }}
        className="mt-auto pt-4 border-t border-dashed border-gray-400"
      >
        <p className="font-bold font-mono text-sm uppercase flex items-center gap-2">
          <span className="text-xs">&gt;</span> {data.author}
        </p>
        <p className="font-mono text-xs text-gray-500 pl-4">{data.role}</p>
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 w-full">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-8 border-b-4 border-black pb-2">
          <h2 className="text-4xl font-mono font-bold uppercase tracking-tight">
            Testimonials
          </h2>
        </div>
        
        {/* Newspaper Grid Layout */}
        {/* Uses standard CSS borders to create the 'column' look */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-black divide-y md:divide-y-0 md:divide-x divide-black bg-gray-50">
          {testimonialsData.map((item, index) => (
            <div key={item.id} className="bg-white">
              <TypewriterCard 
                data={item} 
                isVisible={isVisible} 
                delay={index * 1500} // 1.5s delay between each card starting
              />
            </div>
          ))}
        </div>
        
        {/* Newspaper Footer Metadata */}
        <div className="flex justify-between text-xs font-mono mt-2 text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-2">
          <span>Vol. 01</span>
          <span>*** Verified Reviews ***</span>
          <span>Pg. 04</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;