import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailServices } from '../config';

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
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto shadow-neumorph p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 rounded-lg shadow-neumorph bg-transparent"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium mb-1">
            Your Contact
          </label>
          <input
            type="text"
            id="contact"
            required
            value={formData.contact}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
            className="w-full p-3 rounded-lg shadow-neumorph bg-transparent"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="w-full p-3 rounded-lg shadow-neumorph bg-transparent resize-none"
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          className="w-full p-3 rounded-lg shadow-neumorph flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send className="w-4 h-4" />
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </motion.button>
        {status === 'success' && (
          <p className="text-green-500 text-center">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
        )}
      </div>
    </motion.form>
  );
}