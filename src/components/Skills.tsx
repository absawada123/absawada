// src/components/Skills.tsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useTypingScroll } from '@/hooks/useTypingScroll';
import ProgressBar from './ProgressBar';

const skillsData = {
  "Software & Development": [
    { name: "Full-Stack Development", level: 95 },
    { name: "Web Development", level: 60 },
    { name: "Software Development", level: 80 },
    { name: "Software as a Service (SaaS)", level: 70 },
  ],
  "Data & AI": [
    { name: "Artificial Intelligence (AI)", level: 80 },
    { name: "Data Analysis", level: 50 },
    { name: "Databases & SQLite", level: 90 },
    { name: "Data Science", level: 75 },
  ],
  "Hardware & Electronics": [
    { name: "Computer Hardware", level: 100 },
    { name: "Computer & Electronics Repair", level: 100 },
    { name: "Cell Phone Repair", level: 80 },
    { name: "Electrical Wiring", level: 70 },
  ],
  "Tools & DevOps": [
    { name: "DevOps", level: 50 },
    { name: "Adobe Photoshop", level: 90 },
    { name: "Adobe Premiere Pro", level: 90 },
  ],
};

const SkillCategory = ({ title, skills }: { title: string; skills: { name: string; level: number }[] }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isIntersecting = useIntersectionObserver(titleRef);
  const typedTitle = useTypingScroll(title, isIntersecting);

  return (
    <div className="bg-light-gray p-6 rounded-lg shadow-md">
      <h3 ref={titleRef} className="text-2xl font-mono font-semibold mb-6 text-pastel-blue">
        {typedTitle}
        <span className="animate-blink">|</span>
      </h3>
      <div>
        {skills.map((skill) => (
          <ProgressBar key={skill.name} skill={skill.name} percentage={skill.level} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-20">
      <h2 className="text-4xl font-mono font-bold mb-12 text-center">Skills & Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skillsData).map(([category, skills]) => (
          <SkillCategory key={category} title={category} skills={skills} />
        ))}
      </div>
    </section>
  );
};

export default Skills;