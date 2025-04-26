"use client";

import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const DisclaimerPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Create a pulsing effect every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Circular button with continuous animation */}
      <button
        onClick={togglePopup}
        className={`w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors relative overflow-hidden ${pulse ? 'scale-110' : 'scale-100'} transition-transform duration-500`}
        aria-label="Disclaimer"
      >
        <FaExclamationTriangle className="text-white text-xl" />
        
        {/* Continuous animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
        
        {/* Pulsing ring */}
        <div className={`absolute inset-0 rounded-full border-2 border-white opacity-50 ${pulse ? 'scale-125' : 'scale-100'} transition-transform duration-1000`}></div>
        
        {/* Water drop animations */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-waterDrop"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-waterDrop" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-waterDrop" style={{ animationDelay: '1s' }}></div>
      </button>

      {/* Popup content */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-72 bg-white rounded-lg shadow-xl p-4 border border-gray-200 animate-fadeIn">
          <div className="text-sm text-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <FaExclamationTriangle className="text-blue-600" />
              <p className="font-semibold text-blue-600">Disclaimer</p>
            </div>
            <p className="leading-relaxed">
              ALL THESE API IS USED IN THIS WEB HARVESTED BY SOMEONE I'M NOT RESPONSIBLE FOR ANY MISUSE....
            </p>
          </div>
          
          {/* Close button */}
          <button
            onClick={togglePopup}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <FaTimes />
            <span>Close</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DisclaimerPopup; 