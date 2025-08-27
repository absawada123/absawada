// src/components/ContactForm.tsx
import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useTypingScroll } from '@/hooks/useTypingScroll';

const ContactForm = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isIntersecting = useIntersectionObserver(titleRef);
  const typedTitle = useTypingScroll("Get In Touch", isIntersecting);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    // --- IMPORTANT ---
    // Replace these placeholders with your actual EmailJS credentials
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const userID = 'YOUR_USER_ID';

    emailjs.send(serviceID, templateID, {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
    }, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }, (err) => {
        console.log('FAILED...', err);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <section id="contact" className="min-h-screen py-20">
      <h2 ref={titleRef} className="text-4xl font-mono font-bold mb-12 text-center">
        {typedTitle}
        <span className="animate-blink">|</span>
      </h2>
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 bg-light-gray rounded border border-dark-gray/20 focus:outline-none focus:ring-2 focus:ring-pastel-blue"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 bg-light-gray rounded border border-dark-gray/20 focus:outline-none focus:ring-2 focus:ring-pastel-blue"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 bg-light-gray rounded border border-dark-gray/20 focus:outline-none focus:ring-2 focus:ring-pastel-blue"
          ></textarea>
          <button
            type="submit"
            className="p-3 bg-pastel-blue text-paper-white font-bold rounded hover:bg-opacity-80 transition-colors"
          >
            Send Message
          </button>
        </form>
        {status && <p className="text-center mt-4 font-mono">{status}</p>}
        <div className="text-center mt-8 font-sans">
          <p>Or reach out via:</p>
          <div className="flex justify-center gap-4 mt-2">
            <a 
              href="https://www.linkedin.com/in/ab-sawada-2b3482378/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-pastel-blue underline hover:text-warm-yellow transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/absawada123" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-pastel-blue underline hover:text-warm-yellow transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/ab_sawada/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-pastel-blue underline hover:text-warm-yellow transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;