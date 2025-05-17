import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">
          Disclaimer: This application provides general fitness guidance and is not a substitute for professional medical advice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;