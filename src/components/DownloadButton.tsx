import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import '../styles/downloadButton.css';

interface DownloadButtonProps {
  onDownload?: () => void;
  title?: string;
  subtitle?: string;
}

export default function DownloadButton({ 
  onDownload, 
  title = "Download Resume",
  subtitle = "With super fizzy particle action"
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    onDownload?.();
    setTimeout(() => {
      setIsDownloading(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {(title || subtitle) && (
        <div className="text-center">
          {title && <h1 className="text-2xl font-thin text-white uppercase m-0">{title}</h1>}
          {subtitle && <h2 className="text-sm font-thin text-[#00C4FF] mt-1">{subtitle}</h2>}
        </div>
      )}

      <div className="relative w-[200px]">
        <input 
          id="download-button" 
          type="checkbox"
          className="hidden"
          checked={isDownloading}
          onChange={handleDownload}
        />
        <label htmlFor="download-button" className="cursor-pointer">
          <div className={`
            button-inner relative w-[200px] h-[50px] mx-auto
            border-2 border-white text-white text-sm font-thin
            flex items-center justify-center gap-2
            transition-all duration-300
            ${isDownloading ? 'downloading' : 'hover:bg-white hover:text-[#2C3940] hover:shadow-lg'}
          `}>
            <Download className={`
              download-icon w-6 h-6 text-[#00C4FF]
              transition-all duration-300
            `} />
            <span className="button-text relative transition-all duration-300">
              Download
            </span>
            <span className="tick-wrapper">
              <Check className="tick-icon w-6 h-6" />
            </span>
            <div className="button-particles">
              {[...Array(52)].map((_, index) => (
                <div key={index} className="particle" />
              ))}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
} 