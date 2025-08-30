// src/components/Skills.tsx
import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from './SkillCard'; // Import the new component

// Import icons from react-icons
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDatabase
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiVite,
  SiExpress, SiSqlite, SiElectron, SiPuppeteer, SiAdobephotoshop, SiAdobepremierepro
} from 'react-icons/si';
import { TbDeviceDesktopAnalytics, TbApi, TbCpu, TbRobot } from 'react-icons/tb'; // Added TbRobot
import { GiArtificialIntelligence } from 'react-icons/gi';

// New data structure for skills
const skillsData = [
  { name: 'HTML5/CSS3', icon: <FaHtml5 />, description: 'Responsive & Modern Layouts' },
  { name: 'JavaScript', icon: <SiJavascript />, description: 'ES6+ Syntax & Concepts' },
  { name: 'TypeScript', icon: <SiTypescript />, description: 'Static Typing & Scalability' },
  { name: 'React.js', icon: <FaReact />, description: 'Component-Based Architecture' },
  { name: 'Next.js', icon: <SiNextdotjs />, description: 'SSR & SSG Framework' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, description: 'Utility-First Styling' },
  { name: 'TanStack Query', icon: <TbDeviceDesktopAnalytics />, description: 'Server State Management' },
  { name: 'Node.js', icon: <FaNodeJs />, description: 'Backend JavaScript Runtime' },
  { name: 'Express', icon: <SiExpress />, description: 'Minimalist Web Framework' },
  { name: 'Databases', icon: <FaDatabase />, description: 'SQL, SQLite, Supabase, PostgreSQL, MySQL' },
  { name: 'Electron', icon: <SiElectron />, description: 'Desktop App Development' },
  { name: 'AI/ML APIs', icon: <GiArtificialIntelligence />, description: 'Gemini & Groq Integration' },
  { name: 'Web Scraping', icon: <SiPuppeteer />, description: 'Puppeteer & Cheerio' },
  { name: 'Git/GitHub', icon: <FaGitAlt />, description: 'Version Control Systems' },
  { name: 'Photoshop', icon: <SiAdobephotoshop />, description: 'UI/UX Design & Graphics' },
  { name: 'Premiere Pro', icon: <SiAdobepremierepro />, description: 'Video Editing & Production' },
  { name: 'Hardware/Repair', icon: <TbCpu />, description: 'PC Building & Electronics' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
          Skills & Tools
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillsData.map((skill, index) => (
            <motion.div key={index} variants={itemVariants} style={{ minHeight: '180px' }}>
              <SkillCard
                name={skill.name}
                icon={skill.icon}
                description={skill.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;