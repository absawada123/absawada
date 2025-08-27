// src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Preloader from '@/components/Preloader';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2500); // Corresponds to preloader animation
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Head>
        <title>AB Sawada | Tech Enthusiast</title>
        <meta name="description" content="Portfolio of AB Sawada, a tech enthusiast." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <ContactForm />
      </MainLayout>
    </>
  );
}