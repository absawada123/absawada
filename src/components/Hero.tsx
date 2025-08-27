// src/components/Hero.tsx
import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const initialText = "> Welcome to AB's Portfolio";
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (displayText.length < initialText.length) {
        setDisplayText(initialText.substring(0, displayText.length + 1));
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [displayText, initialText.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (isTyping) return;
      const scrollY = window.scrollY;
      const textLength = initialText.length;
      const charsToDelete = Math.min(Math.floor(scrollY / 15), textLength);
      setDisplayText(initialText.substring(0, textLength - charsToDelete));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTyping, initialText]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-mono font-bold text-center">
        {displayText}
        <span className="animate-blink">|</span>
      </h1>
    </section>
  );
};

export default Hero;