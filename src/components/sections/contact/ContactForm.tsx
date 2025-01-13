import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { cva } from 'class-variance-authority';
import { emailServices } from '../../../config';
import CTAButton from '../../common/CTAButton';

const buttonStyles = cva(
  "relative overflow-hidden px-8 py-4 rounded-lg font-medium text-white flex items-center gap-3 group",
  {
    variants: {
      state: {
        idle: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600",
        sending: "bg-gray-400 cursor-not-allowed",
        success: "bg-green-500",
        error: "bg-red-500"
      }
    },
    defaultVariants: {
      state: "idle"
    }
  }
);

// Add this CSS to your global styles or as a style tag
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        emailServices.YOUR_SERVICE_ID,
        emailServices.YOUR_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_contact: formData.contact,
          message: formData.message,
        },
        emailServices.YOUR_USER_ID
      );
      setStatus('success');
      setFormData({ name: '', contact: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      <style>{shimmerStyles}</style>
      <div className="w-full">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Send Me a Message</h3>
          <p className="text-gray-600 dark:text-gray-400">
            I'll get back to you as soon as possible.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-4 pl-12 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="John Doe"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="contact" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Your Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="contact"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full p-4 pl-12 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="john@example.com"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Your Message
            </label>
            <div className="relative h-full">
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full h-[calc(100%-2rem)] min-h-[165px] p-4 pl-12 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 resize-none"
                placeholder="Write your message here..."
              />
              <MessageSquare className="w-5 h-5 text-gray-400 absolute left-4 top-[1.2rem]" />
            </div>
          </div>

          {/* Updated CTA Section with cleaner effects */}
          <div className="md:col-span-2 space-y-4 flex flex-col items-end">
            <CTAButton 
              label={status === 'sending' ? 'Sending...' : 'Send Message'} 
              onClick={handleSubmit} 
              variant="colored"
              Icon={Send}
            />

            {/* Status messages with futuristic animations */}
            {status === 'success' && (
              <motion.div
                className="text-green-500 py-2 px-4 rounded-lg bg-green-50/10 backdrop-blur-sm 
                           border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]
                           flex items-center gap-2"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ✓
                </motion.div>
                Message sent successfully!
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div
                className="text-red-500 py-2 px-4 rounded-lg bg-red-50/10 backdrop-blur-sm 
                           border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]
                           flex items-center gap-2"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3, repeat: 2 }}
                >
                  ⚠️
                </motion.div>
                Failed to send message. Please try again.
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </>
  );
}