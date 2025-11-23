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
    title: "ERPhy",
    description: "ERPhy is a modern, offline-first ERP for Filipino solopreneurs and SMEs. It brings AI-powered finance tools, CRM, job orders, asset tracking, receipt scanning, and PH-ready compliance into one simple desktop app. Built with Electron and React, it runs fast on SQLite and syncs to Supabase when online—making business management easy, smart, and accessible.",
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
    image: "/images/erphy.png",
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