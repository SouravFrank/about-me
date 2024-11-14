import { useState } from 'react';
import './DownloadButton.css';

const DownloadButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(true);
    // Reset the checkbox after the animation
    setTimeout(() => setIsChecked(false), 3000); // Adjust time as needed
  };

  return (
    <div className="download-button-container">
      <input
        id="download-button"
        type="checkbox"
        checked={isChecked}
        onChange={() => {}}
      />
      <label htmlFor="download-button" onClick={handleClick}>
        <div className="button_inner">
          <span className="button_text">Download CV</span>
          <span className="tick">✓</span>
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
};

export default DownloadButton; 