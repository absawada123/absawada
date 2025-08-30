// src/components/Projects.tsx
import React, { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import Modal from './Modal';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useTypingScroll } from '@/hooks/useTypingScroll';

const projectsData = [
  {
    title: "OpSuite",
    description: "An integrated desktop app for operational management, featuring real-time monitoring, predictive analytics, and AI-driven insights.",
    techStack: ["Electron", "React", "TypeScript", "Vite", "Node.js", "SQLite"],
    image: "/images/project1.png",
    video: null // No video for this project
  },
  {
    title: "Tenant Management System",
    description: "An offline-first desktop app for property management, featuring tenant/unit tracking, payment processing, and a secure QR-based visitor system.",
    techStack: ["Electron", "React", "TypeScript", "Vite", "Tailwind CSS", "SQLite", "Express.js", "Twilio"],
    image: "/images/project2.png",
    video: "/video/tms.mp4" // Add the video path here
  },
   {
    title: "ERP",
    description: "PH ERP Suite is a comprehensive Philippines-based ERP system designed to streamline business processes, manage resources efficiently, and provide real-time insights for small to medium enterprises.",
     "techStack": [
    "Electron",
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "SQLite",
    "Express.js",
    "Supabase",
    "DND Kit",
    "Radix UI",
    "Recharts",
    "EmailJS",
    "Tesseract.js"
  ],
    image: "/images/commingsoon.jpg",
    video: null // No video for this project
  },
];

const Projects = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isIntersecting = useIntersectionObserver(titleRef);
  const typedTitle = useTypingScroll("My Projects", isIntersecting);

  // State to manage the modal
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleOpenModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <section id="projects" className="min-h-screen py-20">
        <h2 ref={titleRef} className="text-4xl font-mono font-bold mb-12 text-center">
          {typedTitle}
          <span className="animate-blink">|</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              image={project.image}
              video={project.video} // Pass the video prop
              onImageClick={handleOpenModal} // Pass the handler to the card
            />
          ))}
        </div>
      </section>

      {/* Render the Modal component */}
      <Modal
        isOpen={!!modalImage}
        onClose={handleCloseModal}
        imageUrl={modalImage || ''}
      />
    </>
  );
};

export default Projects;