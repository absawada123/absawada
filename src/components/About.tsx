// src/components/About.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  const fullText = "Hi, I’m AB Sawada from the Philippines. I’m a student and a passionate tech enthusiast with a strong focus on developing modern, responsive, and user-friendly web applications. I enjoy tackling complex problems and bringing ideas to life through code. Beyond software, I’m fascinated by hardware, electronics, emerging technologies, and everything related to computers.";
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;

    if (isSectionVisible) {
      // If the section is visible, start the typing animation from the beginning.
      let currentIndex = 0;
      setTypedText(''); // Reset text to start over

      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText((prev) => prev + fullText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 40);
    } else {
      // If the section is not visible, reset the text.
      setTypedText('');
    }

    // This cleanup function runs when the component unmounts OR when `isSectionVisible` changes.
    return () => {
      clearInterval(typingInterval);
    };
  }, [isSectionVisible, fullText]); // The effect now correctly depends on visibility.

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center py-20">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 w-full">
        {/* Left Column: Text */}
        <div className="md:w-3/5">
          <h2 className="text-4xl font-mono font-bold mb-8">
            About Me
          </h2>
          <p className="text-xl font-mono leading-relaxed">
            {typedText}
            {/* Show cursor only when typing is in progress and section is visible */}
            {isSectionVisible && typedText.length < fullText.length && <span className="animate-blink">|</span>}
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="md:w-2/5 flex justify-center mt-12 md:mt-0">
          <div 
            className={`w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full shadow-lg transition-opacity duration-300 ${isSectionVisible ? 'animate-[print_1.5s_steps(15,end)_forwards] opacity-100' : 'h-0 opacity-0'}`}
          >
            <div className="profile-wrapper relative w-full h-full">
              <img 
                src="/images/profile.jpg" 
                alt="AB Sawada" 
                className="profile-photo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;