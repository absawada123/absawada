import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { useTypingScroll } from '@/hooks/useTypingScroll';
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isIntersecting = useIntersectionObserver(titleRef);
  const typedTitle = useTypingScroll("Correspondence", isIntersecting); // Changed from "Get In Touch"

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Transmitting...');

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
        setStatus('Message Transmitted Successfully.');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      }, (err) => {
        console.log('FAILED...', err);
        setStatus('Transmission Failed. Retry.');
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-[#f0f0f0]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* The "Paper" Container */}
        <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-12 relative overflow-hidden">
          
          {/* Decorative Stamp */}
          <div className="absolute top-6 right-6 w-24 h-24 border-4 border-double border-gray-200 rounded-full flex items-center justify-center -rotate-12 opacity-50 pointer-events-none">
             <span className="font-mono text-xs text-gray-300 uppercase text-center">Official<br/>Document<br/>2024</span>
          </div>

          {/* Header Section */}
          <div className="border-b-4 border-black pb-6 mb-10">
            <h2 ref={titleRef} className="text-4xl md:text-5xl font-mono font-bold uppercase tracking-tighter">
              {typedTitle}
              <span className="animate-blink">_</span>
            </h2>
            <div className="flex justify-between items-end mt-2 font-mono text-xs md:text-sm text-gray-500 uppercase">
              <span>Form No. 99-C</span>
              <span>Re: Project Inquiry / Collab</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Social Directory */}
            <div className="md:col-span-5 font-mono">
              <h3 className="text-xl font-bold uppercase border-b border-black pb-2 mb-6">
                // Digital Channels
              </h3>
              
              <p className="text-sm mb-8 leading-relaxed text-gray-600">
                Available for freelance opportunities, full-time roles, or technical consultations. Select a channel below or use the inquiry form.
              </p>

              <div className="flex flex-col gap-4">
                <SocialLink 
                  href="https://www.linkedin.com/in/ab-sawada-2b3482378/" 
                  label="LinkedIn" 
                  code="LNKD-IN" 
                  icon={<FaLinkedin />} 
                />
                <SocialLink 
                  href="https://github.com/absawada123" 
                  label="GitHub" 
                  code="GIT-HUB" 
                  icon={<FaGithub />} 
                />
                <SocialLink 
                  href="https://www.instagram.com/ab_sawada/" 
                  label="Instagram" 
                  code="INST-GM" 
                  icon={<FaInstagram />} 
                />
              </div>

              {/* Contact Info Snippet */}
              <div className="mt-10 p-4 bg-gray-100 border border-dashed border-gray-400 text-xs">
                <p><strong>STATUS:</strong> OPEN TO WORK</p>
                <p><strong>LOCATION:</strong> PHILIPPINES</p>
                <p><strong>TIMEZONE:</strong> GMT+8</p>
              </div>
            </div>

            {/* RIGHT COLUMN: The Form */}
            <div className="md:col-span-7 font-mono">
               <h3 className="text-xl font-bold uppercase border-b border-black pb-2 mb-6">
                // Inquiry Slip
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name Input */}
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase mb-1 text-gray-500 group-focus-within:text-black transition-colors">
                    01. Sender Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b-2 border-gray-300 py-2 text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-300"
                  />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase mb-1 text-gray-500 group-focus-within:text-black transition-colors">
                    02. Return Address (Email)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b-2 border-gray-300 py-2 text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-300"
                  />
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase mb-1 text-gray-500 group-focus-within:text-black transition-colors">
                    03. Message Content
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Project details..."
                    className="w-full bg-transparent border-b-2 border-gray-300 py-2 text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-300 resize-none"
                  ></textarea>
                </div>

                {/* Status Message */}
                {status && (
                  <div className="p-2 bg-black text-white text-xs text-center animate-pulse">
                    [{status}]
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 group relative w-full overflow-hidden bg-black text-white px-8 py-4 text-lg font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? 'Processing...' : 'Transmit Message'}
                    {!isSubmitting && <FaPaperPlane className="text-sm group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer Note outside the paper */}
        <div className="text-center mt-8 font-mono text-xs text-gray-400 uppercase tracking-widest">
          *** End of Document ***
        </div>

      </div>
    </section>
  );
};

// Helper Component for Social Links
const SocialLink = ({ href, label, code, icon }: { href: string, label: string, code: string, icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center justify-between p-3 border border-black bg-white hover:bg-black hover:text-white transition-all duration-300 group"
  >
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <span className="font-bold">{label}</span>
    </div>
    <span className="text-xs opacity-50 group-hover:opacity-100 tracking-widest">{code}</span>
  </a>
);

export default ContactForm;