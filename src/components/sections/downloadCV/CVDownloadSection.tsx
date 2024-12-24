import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export const CVDownloadSection = () => (
  <section className="py-20 px-8">
    <motion.div className="max-w-md mx-auto shadow-neumorph p-8 rounded-lg text-center" whileHover={{ scale: 1.05 }}>
      <h2 className="text-2xl font-bold mb-4">Download My Resume</h2>
      <motion.a href="/resume.pdf" download className="inline-flex items-center px-6 py-3 rounded-full shadow-neumorph" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Download className="w-5 h-5 mr-2" /> Download CV
      </motion.a>
    </motion.div>
  </section>
);
