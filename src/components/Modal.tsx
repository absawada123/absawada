// src/components/Modal.tsx
import React from 'react';
import { useRouter } from 'next/router';

// Define the shape of the props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const Modal = ({ isOpen, onClose, imageUrl }: ModalProps) => {
  const { basePath } = useRouter();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-paper-white p-4 rounded-lg shadow-xl max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-dark-gray bg-paper-white rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold z-10 shadow-lg hover:bg-light-gray transition-colors"
        >
          &times;
        </button>
        <img src={`${basePath}${imageUrl}`} alt="Project Preview" className="max-w-full max-h-[85vh] object-contain" />
      </div>
    </div>
  );
};

export default Modal;