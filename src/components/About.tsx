// src/components/About.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useRouter } from 'next/router'; // 1. Import useRouter

const About = () => {
  const { basePath } = useRouter(); // 2. Get the basePath
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  const fullText = "A passionate tech enthusiast with a focus on creating modern, responsive, and user-friendly web applications. I love solving complex problems and bringing ideas to life through code.";
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    if (isSectionVisible) {
      let currentIndex = 0;
      setTypedText('');
      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText((prev) => prev + fullText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 40);
    } else {
      setTypedText('');
    }
    return () => clearInterval(typingInterval);
  }, [isSectionVisible, fullText]);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center py-20">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 w-full">
        <div className="md:w-3/5">
          <h2 className="text-4xl font-mono font-bold mb-8">About Me</h2>
          <p className="text-xl font-mono leading-relaxed">
            {typedText}
            {isSectionVisible && typedText.length < fullText.length && <span className="animate-blink">|</span>}
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center mt-12 md:mt-0">
          <div className={`w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full shadow-lg transition-opacity duration-300 ${isSectionVisible ? 'animate-[print_1.5s_steps(15,end)_forwards] opacity-100' : 'h-0 opacity-0'}`}>
            <div className="profile-wrapper relative w-full h-full">
              <img 
                src={`${basePath}/images/profile.jpg`} // 3. Apply the basePath
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