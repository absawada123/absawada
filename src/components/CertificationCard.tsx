// src/components/CertificationCard.tsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useRouter } from 'next/router';

// Define the shape of the 'cert' object
interface Certification {
  issuer: string;
  title: string;
  logo: string;
}

// Define the shape of the component's props
interface CertificationCardProps {
  cert: Certification;
  onClick: () => void;
}

const CertificationCard = ({ cert, onClick }: CertificationCardProps) => {
  const { basePath } = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`bg-light-gray rounded-lg shadow-md p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-between ${isVisible ? 'animate-[print_1s_steps(10,end)_forwards] opacity-100' : 'opacity-0'}`}
      onClick={onClick}
      style={{ overflow: 'hidden' }}
    >
      <div className="h-24 w-full flex items-center justify-center mb-4">
        <img src={`${basePath}${cert.logo}`} alt={`${cert.issuer} logo`} className="max-h-20 max-w-full object-contain" />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-mono font-bold leading-tight">{cert.title}</h3>
        <p className="font-sans text-dark-gray/80 mt-2">{cert.issuer}</p>
      </div>
    </div>
  );
};

export default CertificationCard;