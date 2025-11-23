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
  category: 'Technical' | 'Soft Skills';
}

const certificationsData: Certification[] = [
  // --- TECHNICAL ---
  {
    issuer: "IBM SkillsBuild",
    title: "Data Fundamentals",
    date: "Aug 2025",
    logo: "/images/DataFundamentals.png",
    credentialId: "1de69044-dd98-4c19-9dc6-1a8a2ff584ab",
    description:
      "Demonstrates knowledge of data analytics concepts, methodologies, applications of data science, and the tools used in the data ecosystem...",
    credentialUrl:
      "https://www.credly.com/badges/1de69044-dd98-4c19-9dc6-1a8a2ff584ab",
    category: "Technical",
  },
  {
    issuer: "Google Cloud",
    title: "Cyber Security",
    date: "September 2025",
    logo: "/images/google-cloud-cybersecurity-certificate.png",
    credentialId: "766c2d63-faa8-4643-9374-df38be170ba6",
    description:
      "This certificate program prepares learners for cloud security analyst, cybersecurity specialist, and incident response analyst roles. It builds on familiarity with foundational cybersecurity concepts, including a basic understanding of network security, threat analysis, SQL, and incident detection and documentation...",
    credentialUrl:
      "https://www.credly.com/earner/earned/badge/766c2d63-faa8-4643-9374-df38be170ba6",
    category: "Technical",
  },
  {
    issuer: "IBM SkillsBuild",
    title: "Web Development",
    date: "Aug 2025",
    logo: "/images/wdbadge.png",
    credentialId: "61e1e966-c3e5-41f5-acc1-d08a909988da",
    description:
      "Demonstrates knowledge of web development concepts, processes, and tools...",
    credentialUrl:
      "https://www.credly.com/badges/61e1e966-c3e5-41f5-acc1-d08a909988da",
    category: "Technical",
  },
  {
    issuer: "IBM SkillsBuild",
    title: "AI Fundamentals",
    date: "Aug 2025",
    logo: "/images/ai.png",
    credentialId: "e51befe9-f0cd-4383-9a2d-392fb6261bde",
    description:
      "This credential earner demonstrates knowledge of artificial intelligence (AI) concepts, such as natural language processing, computer vision, machine learning, deep learning, chatbots, and neural networks; AI ethics; and the applications of AI. The individual has a conceptual understanding of how to run an AI model using IBM Watson Studio. The earner is aware of the job outlook in fields that use AI and is familiar with the skills required for success in various roles in the domain.",
    credentialUrl:
      "https://www.credly.com/badges/e51befe9-f0cd-4383-9a2d-392fb6261bde",
    category: "Technical",
  },
  // --- COMPILED eTESDA ENTRY ---
  {
    issuer: "eTESDA",
    title: "Computer Systems Servicing Modules",
    date: "Aug 2025",
    logo: "/images/tesda.png",
    credentialId: "9MwRCr8JJH | 9IePGAjVkF | KZNF5IpyWh",
    description:
      "Completed a comprehensive series of modules covering: 1) Introduction to CSS, 2) Installing & Configuring Computer Systems, and 3) Setting Up Computer Networks. These modules equip learners with essential skills to maintain systems and configure networks.",
    credentialUrl: "",
    category: "Technical",
  },
  // ----------------------------
  {
    issuer: "Alfred's Engine Room",
    title: "Best in Presentation",
    date: "Nov 2025",
    logo: "/images/alfred.png",
    credentialId: "",
    description:
      "Awarded the Best in Presentation at Alfred's Engine Room | Crafting Tomorrow's Ventures: Kick-off and Ideation 2025, recognizing an outstanding innovative concept and an exceptional presentation that embodied the event’s theme, “Empowering Techpreneurs: Innovation through Community and Collaboration.” This honor highlights excellence in clarity, creativity, and communication during the ideation showcase held on 21 November 2025 at the AWS Office, Arthaland Century Pacific Tower, Bonifacio Global City, Taguig, Philippines.",
    credentialUrl: "",
    category: "Technical",
  },

  // --- SOFT SKILLS ---
  {
    issuer: "Wadhwani Foundation",
    title: "Effective Speaking",
    date: "Nov 2024",
    logo: "/images/wadhwani-logo.png",
    credentialId: "6727178ab53d7dced827b746",
    description:
      "This certification validates proficiency in effective verbal communication, active listening, and interpersonal skills...",
    credentialUrl:
      "https://web.certificate.wfglobal.org/en/certificate?certificateId=6727178ab53d7dced827b746",
    category: "Soft Skills",
  },
  {
    issuer: "Wadhwani Foundation",
    title: "Impactful Writing",
    date: "Nov 2024",
    logo: "/images/wadhwani-logo.png",
    credentialId: "6727190db53d7dced827ba32",
    description:
      "This certification validates the ability to produce clear, concise, and impactful written communication...",
    credentialUrl:
      "https://web.certificate.wfglobal.org/en/certificate?certificateId=6727190db53d7dced827ba32",
    category: "Soft Skills",
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