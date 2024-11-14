import { useState } from 'react';

const DownloadButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(true);
    // Reset the checkbox after the animation
    setTimeout(() => setIsChecked(false), 3000); // Adjust time as needed
  };

  return (
    <div className="flex justify-center items-center py-10">
      <input
        id="download-button"
        type="checkbox"
        checked={isChecked}
        onChange={() => {}}
        className="hidden" // Hide the checkbox
      />
      <label htmlFor="download-button" onClick={handleClick} className="relative cursor-link">
        <div className={`flex items-center justify-center px-8 py-4 rounded-full transition-transform duration-300 ease-in-out 
          ${isChecked ? 'bg-transparent' : 'bg-gradient-to-r from-blue-500 to-indigo-500'} 
          shadow-lg hover:shadow-xl`}>
          <span className={`text-white font-bold text-lg transition-opacity duration-300 ${isChecked ? 'opacity-0' : 'opacity-100'}`}>
            Download CV
          </span>
          <span className={`absolute text-white text-2xl transition-transform duration-300 ${isChecked ? 'translate-x-0' : 'translate-x-10 opacity-0'}`}>
            ✓
          </span>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="particle w-2 h-2 bg-white rounded-full opacity-0 animate-particle"></div>
              ))}
            </div>
          </div>
        </div>
      </label>
      <style jsx>{`
        @keyframes particle {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y));
            opacity: 0;
          }
        }
        .particle {
          position: absolute;
          animation: particle 1s forwards;
          animation-delay: calc(${Math.random()} * 1s);
        }
      `}</style>
    </div>
  );
};

export default DownloadButton; 