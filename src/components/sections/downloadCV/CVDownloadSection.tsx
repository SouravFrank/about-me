import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { SectionWrapper } from '../../common';
import { sectionData } from '../../../data/sectionData';

export const CVDownloadSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleViewResume = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <SectionWrapper 
      titleBold={sectionData.cvDownload.titleBold}
      titleLight={sectionData.cvDownload.titleLight}
      description={sectionData.cvDownload.description}
      isDark={false}
      opacityPosition={0.8}
    >
      <div className="max-w-md mx-auto py-10">
        <motion.div className="shadow-lg p-8 rounded-lg text-center bg-white" whileHover={{ scale: 1.05 }}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{sectionData.cvDownload.titleBold} {sectionData.cvDownload.titleLight}</h2>
          <p className="mb-6 text-gray-600">{sectionData.cvDownload.description}</p>
          <div className="flex justify-center space-x-4">
            <motion.a 
              href="/resume.pdf" 
              download 
              className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition duration-300" 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 mr-2" /> Download CV
            </motion.a>
            <button 
              onClick={handleViewResume} 
              className="inline-flex items-center px-6 py-3 rounded-full bg-green-500 text-white shadow-md hover:bg-green-600 transition duration-300"
            >
              View Resume
            </button>
          </div>
        </motion.div>

        {/* Modal for viewing resume */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2 text-gray-800">Resume</h2>
              <iframe src="/resume.pdf" width="100%" height="500px" title="Resume" className="border-0" />
              <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};
