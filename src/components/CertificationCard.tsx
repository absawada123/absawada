// src/components/CertificationCard.tsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';

interface Certification {
  issuer: string;
  title: string;
  logo: string;
}

interface CertificationCardProps {
  cert: Certification;
  onClick: () => void;
}

const CertificationCard = ({ cert, onClick }: CertificationCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`bg-light-gray rounded-lg shadow-md p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-between ${isVisible ? 'animate-[print_1s_steps(10,end)_forwards] opacity-100' : 'opacity-0'}`}
      onClick={onClick}
      style={{ overflow: 'hidden' }} // Keep overflow hidden for the animation
    >
      {/* Logo container */}
      <div className="h-24 w-full flex items-center justify-center mb-4">
        <img src={cert.logo} alt={`${cert.issuer} logo`} className="max-h-20 max-w-full object-contain" />
      </div>

      {/* Text content */}
      <div className="flex-grow">
        <h3 className="text-lg font-mono font-bold leading-tight">{cert.title}</h3>
        <p className="font-sans text-dark-gray/80 mt-2">{cert.issuer}</p>
      </div>
    </div>
  );
};

export default CertificationCard;