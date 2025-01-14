import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { sectionData } from '../../../data/sectionData';
import CVCard from './CVCard';
import { CVDownloadSectionProps } from './types';
import { personalInfo } from '../../../data/personalInfo';

export const CVDownloadSection: React.FC<CVDownloadSectionProps> = ({ isDark }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(true);
  const [downloadClicked, setDownloadClicked] = useState(false);

  const handleDownload = () => {
    setLoadingPdf(true);

    const link = document.createElement('a');
    link.href = personalInfo.downLoadResumeLink;
    link.download = 'Resume_Sourav_Sadhukhan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDownloadClicked(true);
      setLoadingPdf(false);
    }, 1000);
    setTimeout(() => {
      setDownloadClicked(false);
    }, 2500);
  };

  const handleShow = () => {
    setLoadingPdf(true);
    setModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
        <CVCard isDark={isDark} title={`${sectionData.cvDownload.titleBold} ${sectionData.cvDownload.titleLight}`} description={sectionData.cvDownload.description} onPreview={handleShow} onDownload={handleDownload} downloadClicked={downloadClicked} />
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
                    <iframe src={personalInfo.viewResumeLink} className="w-full h-[70vh] border-0" title="Resume Preview" onLoad={() => setLoadingPdf(false)} />
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
