// src/hooks/useScrambleText.ts
import { useState, useEffect, useRef } from 'react';

// Character set for scrambling
const chars = '><-!@#$%^&*()_+[]{}|;:,./?';

export const useScrambleText = (
  text: string,
  isIntersecting: boolean,
  options: { speed?: number; delay?: number } = {}
) => {
  const { speed = 50, delay = 300 } = options;
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup any running timers when dependencies change
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isIntersecting) {
      // Start the effect after the initial delay
      timeoutRef.current = setTimeout(() => {
        let iteration = 0;
        
        intervalRef.current = setInterval(() => {
          const newText = text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              // After a certain number of iterations, reveal the correct character
              if (index < iteration) {
                return text[index];
              }
              // Otherwise, show a random character
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          setDisplayText(newText);
          
          // Stop the interval once all characters are revealed
          if (iteration >= text.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
          
          iteration += 1 / 3; // Controls the speed of the final text reveal
        }, 30); // Controls the speed of the scramble animation itself

      }, delay);
    } else {
      // Reset text when it's not in view
      setDisplayText('');
    }

    // Cleanup function to clear timers when the component unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isIntersecting, text, speed, delay]);

  return displayText;
};