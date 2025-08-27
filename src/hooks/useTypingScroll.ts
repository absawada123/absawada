// src/hooks/useTypingScroll.ts
import { useState, useEffect, useRef } from 'react';

export const useTypingScroll = (
  text: string,
  isIntersecting: boolean,
  speed: number = 50,
  startDelay: number = 300
) => {
  const [typedText, setTypedText] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isIntersecting) {
      if (typedText.length < text.length) {
        timeoutRef.current = setTimeout(() => {
          let currentIndex = 0;
          const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
              setTypedText((prev) => prev + text[currentIndex]);
              currentIndex++;
            } else {
              clearInterval(intervalId);
            }
          }, speed);

          return () => clearInterval(intervalId);
        }, startDelay);
      }
    } else {
      // Reset when not intersecting
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setTypedText('');
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // Disabled exhaustive-deps to control the effect trigger precisely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, text, speed, startDelay]);

  return typedText;
};