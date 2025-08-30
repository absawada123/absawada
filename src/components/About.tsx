// src/components/About.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useRouter } from 'next/router';
import { useAnimate, AnimationSequence } from 'framer-motion';

const About = () => {
  const { basePath } = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useIntersectionObserver(sectionRef, { threshold: 0.5 });

  const [scope, animate] = useAnimate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAnimated = useRef(false);

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
  }, [isSectionVisible]);

  useEffect(() => {
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log("Audio blocked by browser autoplay policy. This is expected."));
      }
    };
    
    const stopSound = () => {
      if(audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    if (isSectionVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      playSound();
      
      const sequence: AnimationSequence = [
        ['.scanner-cursor', { opacity: 1 }, { duration: 0.1 }],
        ['.profile-image-color', { clipPath: 'inset(0 0 0% 0)' }, { duration: 2, ease: 'easeInOut' }],
        ['.scanner-cursor', { top: '100%' }, { duration: 2, at: '-2', ease: 'easeInOut' }],
        ['.scanner-cursor', { opacity: 0 }, { duration: 0.1, at: '-0.1' }],
      ];

      animate(sequence).then(() => stopSound());

    } else if (!isSectionVisible && hasAnimated.current) {
      hasAnimated.current = false;
      stopSound();
      
      const sequence: AnimationSequence = [
        ['.scanner-cursor', { top: '0%', opacity: 0 }, { duration: 0 }],
        ['.profile-image-color', { clipPath: 'inset(0 0 100% 0)' }, { duration: 0.5, ease: 'easeOut' }],
      ];
      animate(sequence);
    }
  }, [isSectionVisible, animate]);

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
          <div ref={scope} className="w-64 h-64 md:w-80 md:h-80">
            <div className="profile-image-container rounded-full overflow-hidden">
              {/* REMOVED the black and white base image. The container's background is now the base. */}
              
              {/* This is the only image, revealed by the animation */}
              <img
                src={`${basePath}/images/profile.jpg`}
                alt="AB Sawada in color"
                className="profile-image profile-image-color"
              />
              
              {/* The animated scanner cursor */}
              <div className="scanner-cursor" />
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src="/sounds/printer.mp3" preload="auto" loop muted />
    </section>
  );
};

export default About;