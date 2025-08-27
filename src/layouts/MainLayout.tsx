// src/layouts/MainLayout.tsx
import React, { ReactNode } from 'react';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;