import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, X } from 'lucide-react';
// import { SectionWrapper } from '../../common';
import { sectionData } from '../../../data/sectionData';
import CTAButton from '../../common/CTAButton';

export const CVDownloadSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(true);

  const handleDownload = () => {
    setDownloadClicked(true);
    setTimeout(() => {
      setDownloadClicked(false);
      // Add actual download logic here
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-3xl shadow-2xl p-10" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-xl" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-indigo-100 rounded-full opacity-20 blur-xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-10 blur-lg" />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <motion.h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {sectionData.cvDownload.titleBold} {sectionData.cvDownload.titleLight}
            </motion.h2>
            <motion.p className="text-gray-600 max-w-2xl mx-auto text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {sectionData.cvDownload.description}
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <CTAButton 
              label="Download CV" 
              onClick={handleDownload} 
              download={true} 
              variant="colored"
              Icon={Download}
              downloadClicked={downloadClicked}
            />
            <CTAButton 
              label="Preview CV" 
              onClick={() => setModalOpen(true)} 
              download={false} 
              variant="white"
              Icon={Eye}
            />
          </div>
        </div>
      </motion.div>

      {/* Enhanced Modal with AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 20 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-2xl font-semibold text-gray-800">CV Preview</h3>
                <motion.button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                  <X className="w-6 h-6 text-gray-500" />
                </motion.button>
              </div>

              <div className="relative">
                {loadingPdf && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <div className="p-6 bg-gray-50">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <iframe src="/resume.pdf" className="w-full h-[70vh] border-0" title="Resume Preview" onLoad={() => setLoadingPdf(false)} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CVDownloadSection;
