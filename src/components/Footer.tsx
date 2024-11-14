import React from 'react';
import madeWithLoveImage from '/images/loveIndiaWeb.png'; // Adjust the path as necessary

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Let's Collaborate!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          I'm always open to new opportunities and collaborations. If you have a project in mind or just want to chat about technology, feel free to reach out!
        </p>
        <img 
          src={madeWithLoveImage} 
          alt="Made with Love from India" 
          className="w-3/4 md:w-2/3 lg:w-1/2 mx-auto mb-4 filter transition duration-300 ease-in-out dark:invert" 
        />
      </div>
    </footer>
  );
};

export default Footer; 