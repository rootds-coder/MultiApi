"use client";

import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Multi API Builder. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/rootds-coder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub className="text-xl" />
              <span className="text-sm">@rootds-coder</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 