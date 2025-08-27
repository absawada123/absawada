// src/components/Certifications.tsx
import React, { useRef, useState } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useTypingScroll } from '@/hooks/useTypingScroll';
import CertificationCard from './CertificationCard';
import CertificationModal from './CertificationModal';

interface Certification {
  issuer: string;
  title: string;
  date: string;
  logo: string;
  credentialId: string;
  description: string;
  credentialUrl: string;
  category: 'Technical' | 'Soft Skills'; // New field for filtering
}

const certificationsData: Certification[] = [
  {
    issuer: "IBM SkillsBuild",
    title: "Data Fundamentals",
    date: "Aug 2025",
    logo: "/images/DataFundamentals.png",
    credentialId: "1de69044-dd98-4c19-9dc6-1a8a2ff584ab",
    description: "Demonstrates knowledge of data analytics concepts, methodologies, applications of data science, and the tools used in the data ecosystem...",
    credentialUrl: "https://www.credly.com/badges/1de69044-dd98-4c19-9dc6-1a8a2ff584ab",
    category: 'Technical'
  },
  {
    issuer: "IBM SkillsBuild",
    title: "AI Fundamentals",
    date: "Aug 2025",
    logo: "/images/aibadge.png",
    credentialId: "e51befe9-f0cd-4383-9a2d-392fb6261bde",
    description: "This credential earner demonstrates knowledge of artificial intelligence (AI) concepts, such as natural language processing, computer vision, machine learning, and neural networks...",
    credentialUrl: "https://www.credly.com/badges/e51befe9-f0cd-4383-9a2d-392fb6261bde",
    category: 'Technical'
  },
  {
    issuer: "IBM SkillsBuild",
    title: "Web Development",
    date: "Aug 2025",
    logo: "/images/wdbadge.png",
    credentialId: "61e1e966-c3e5-41f5-acc1-d08a909988da",
    description: "Demonstrates knowledge of web development concepts, processes, and tools. Includes a conceptual understanding of developing interactive websites using HTML, CSS, and JavaScript...",
    credentialUrl: "https://www.credly.com/badges/61e1e966-c3e5-41f5-acc1-d08a909988da",
    category: 'Technical'
  },
    {
    issuer: "eTESDA",
    title: "Introduction to CSS",
    date: "Aug 2025",
    logo: "/images/tesda.png",
    credentialId: "9MwRCr8JJH",
    description: "This foundational module provides essential knowledge and skills in computer systems servicing...",
    credentialUrl: "",
    category: 'Technical'
  },
  {
    issuer: "eTESDA",
    title: "Installing & Configuring Computer Systems",
    date: "Aug 2025",
    logo: "/images/tesda.png",
    credentialId: "9IePGAjVkF",
    description: "This module provides learners with the essential skills to install, configure, and maintain computer systems...",
    credentialUrl: "",
    category: 'Technical'
  },
  {
    issuer: "eTESDA",
    title: "Setting Up Computer Networks",
    date: "Aug 2025",
    logo: "/images/tesda.png",
    credentialId: "KZNF5IpyWh",
    description: "This module equips learners with the knowledge and skills required to set up and configure computer networks...",
    credentialUrl: "",
    category: 'Technical'
  },
  {
    issuer: "Wadhwani Foundation",
    title: "Effective Speaking",
    date: "Nov 2024",
    logo: "/images/wadhwani-logo.png",
    credentialId: "6727178ab53d7dced827b746",
    description: "This certification validates proficiency in effective verbal communication, active listening, and interpersonal skills essential for professional environments.",
    credentialUrl: "https://web.certificate.wfglobal.org/en/certificate?certificateId=6727178ab53d7dced827b746",
    category: 'Soft Skills'
  },
  {
    issuer: "Wadhwani Foundation",
    title: "Impactful Writing",
    date: "Nov 2024",
    logo: "/images/wadhwani-logo.png",
    credentialId: "6727190db53d7dced827ba32",
    description: "This certification validates the ability to produce clear, concise, and impactful written communication for professional contexts.",
    credentialUrl: "https://web.certificate.wfglobal.org/en/certificate?certificateId=6727190db53d7dced827ba32",
    category: 'Soft Skills'
  }
];

const Certifications = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isIntersecting = useIntersectionObserver(titleRef);
  const typedTitle = useTypingScroll("Licenses & Certifications", isIntersecting);

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technical', 'Soft Skills'];

  const filteredCerts = certificationsData.filter(cert => 
    activeCategory === 'All' || cert.category === activeCategory
  );

  const handleOpenModal = (cert: Certification) => setSelectedCert(cert);
  const handleCloseModal = () => setSelectedCert(null);

  return (
    <>
      <section id="certifications" className="min-h-screen py-20">
        <h2 ref={titleRef} className="text-4xl font-mono font-bold mb-8 text-center">
          {typedTitle}
          <span className="animate-blink">|</span>
        </h2>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 font-mono">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-pastel-blue text-paper-white shadow-md'
                  : 'bg-light-gray hover:bg-dark-gray/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {filteredCerts.map((cert, index) => (
            <CertificationCard 
              key={index} 
              cert={cert} 
              onClick={() => handleOpenModal(cert)} 
            />
          ))}
        </div>
      </section>

      <CertificationModal 
        isOpen={!!selectedCert} 
        onClose={handleCloseModal} 
        cert={selectedCert} 
      />
    </>
  );
};

export default Certifications;