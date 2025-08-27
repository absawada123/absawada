// src/components/ProjectCard.tsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  image: string;
  onImageClick: (imageUrl: string) => void;
}

const ProjectCard = ({ title, description, techStack, image, onImageClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`bg-light-gray rounded-lg shadow-md p-6 flex flex-col transition-opacity duration-500 ${isVisible ? 'animate-[print_1.2s_steps(12,end)_forwards] opacity-100' : 'opacity-0'}`}
      style={{ overflow: 'hidden' }} // Keep overflow hidden for the animation
    >
      {/* Image container with fixed aspect ratio and hover effect */}
      <div
        className="relative w-full aspect-video overflow-hidden mb-4 rounded cursor-pointer group"
        onClick={() => onImageClick(image)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
          <p className="text-white font-mono text-lg opacity-0 group-hover:opacity-100 transition-opacity">
            View Image
          </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="text-2xl font-mono font-bold mb-2">{title}</h3>
        <p className="font-sans mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {techStack.map((tech) => (
            <span key={tech} className="bg-pastel-blue text-paper-white px-2 py-1 text-sm rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;