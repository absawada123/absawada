// src/utils/scrollUtils.ts
import { RefObject, useEffect, useState } from 'react';

export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}