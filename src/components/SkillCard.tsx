// src/components/SkillCard.tsx
import React, { useState, useRef, ReactNode } from 'react';

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazy initialize the audio element
  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/flip.mp3');
      audioRef.current.volume = 0.5; // Adjust volume as needed
    }
    return audioRef.current;
  };

  const playSound = () => {
    const audio = getAudio();
    audio.currentTime = 0;
    audio.play().catch(error => console.error("Error playing sound:", error));
  };

  const handleInteraction = (flipState: boolean) => {
    if (flipState && !isFlipped) {
      playSound();
    }
    setIsFlipped(flipState);
  };
  
  // Toggle for mobile tap
  const handleClick = () => {
    const newState = !isFlipped;
    if (newState) {
      playSound();
    }
    setIsFlipped(newState);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => handleInteraction(false)}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        {/* Front of the Card */}
        <div className="flip-card-front bg-white p-6">
          <div className="text-6xl text-gray-700 mb-3">{icon}</div>
          <p className="text-lg font-semibold text-gray-800">{name}</p>
        </div>
        {/* Back of the Card */}
        <div className="flip-card-back bg-gray-800 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-base text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;