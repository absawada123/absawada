// src/components/ProgressBar.tsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';

interface ProgressBarProps {
  skill: string;
  percentage: number;
}

const ProgressBar = ({ skill, percentage }: ProgressBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(barRef, { threshold: 0.5 });

  return (
    <div className="mb-4 font-mono">
      <div className="flex justify-between mb-1">
        <span className="text-base">{skill}</span>
        <span className="text-sm font-bold text-pastel-blue">{percentage}%</span>
      </div>
      <div className="w-full bg-paper-white rounded-full h-2.5 shadow-inner">
        <div
          ref={barRef}
          className="bg-pastel-blue h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;