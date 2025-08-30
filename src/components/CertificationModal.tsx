// src/components/CertificationModal.tsx
import React from 'react';
import { useRouter } from 'next/router';

// Define the shape of the 'cert' object for the modal
interface Certification {
  issuer: string;
  title: string;
  date: string;
  logo: string;
  credentialId: string;
  description: string;
  credentialUrl: string;
}

// Define the shape of the component's props
interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cert: Certification | null;
}

const CertificationModal = ({ isOpen, onClose, cert }: CertificationModalProps) => {
  const { basePath } = useRouter();
  if (!isOpen || !cert) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-paper-white p-8 rounded-lg shadow-xl max-w-2xl w-full font-mono animate-[print-reveal_0.5s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-dark-gray bg-paper-white rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold z-10 shadow-lg hover:bg-light-gray transition-colors"
        >
          &times;
        </button>
        <div className="flex items-center gap-6 mb-6">
          <img src={`${basePath}${cert.logo}`} alt={`${cert.issuer} logo`} className="w-20 h-20 object-contain" />
          <div>
            <h2 className="text-3xl font-bold text-dark-gray">{cert.title}</h2>
            <p className="text-lg text-dark-gray/80">{cert.issuer}</p>
            <p className="text-sm text-dark-gray/60">Issued: {cert.date}</p>
          </div>
        </div>
        <div className="border-t border-light-gray pt-4">
          <p className="font-sans text-base leading-relaxed my-4">{cert.description}</p>
          <p className="text-sm text-dark-gray/70">
            <strong>Credential ID:</strong> {cert.credentialId}
          </p>
          {cert.credentialUrl && cert.credentialUrl !== '#' && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-pastel-blue font-bold hover:underline"
            >
              Show Credential &gt;
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;