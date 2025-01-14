import React from 'react';
import CTAButton from '../../common/CTAButton';
import { Download, Eye } from 'lucide-react';

interface CVCardProps {
  isDark: boolean;
  title: string;
  description: string;
  onPreview: () => void;
  onDownload: () => void;
  downloadClicked: boolean;
  isButtonDisabled: boolean;
}

const CVCard: React.FC<CVCardProps> = ({ isDark, title, description, onPreview, onDownload, downloadClicked, isButtonDisabled }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-2xl p-10 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <CTAButton 
          label="Download CV" 
          onClick={onDownload} 
          variant="colored" 
          Icon={Download}
          downloadClicked={downloadClicked}
          disabled={isButtonDisabled}
        />
        <CTAButton 
          label="Preview CV" 
          onClick={onPreview} 
          variant="white" 
          Icon={Eye}
        />
      </div>
    </div>
  );
};

export default CVCard; 