import React from 'react';
import { FaInstagram, FaDownload } from 'react-icons/fa';

interface InstagramReelData {
  status: string;
  video_url: string;
}

interface InstagramReelResultProps {
  data: InstagramReelData;
}

const InstagramReelResult: React.FC<InstagramReelResultProps> = ({ data }) => {
  if (!data || data.status !== 'success') {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        No Instagram reel data available
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl shadow-xl border border-purple-500/20">
      <div className="flex items-center gap-3 mb-4">
        <FaInstagram className="text-2xl text-pink-400" />
        <h3 className="text-xl font-semibold text-white">Instagram Reel</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-black/30 p-4 rounded-lg">
          <a 
            href={data.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <FaDownload />
            <span>Download Reel</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstagramReelResult; 