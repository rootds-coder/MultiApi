import React from 'react';
import { FaDownload, FaVideo, FaClock } from 'react-icons/fa';

interface VideoMedia {
  quality: string;
  url: string;
}

interface VideoResultProps {
  data: {
    title: string;
    thumbnail: string;
    duration: string;
    medias: VideoMedia[];
  };
}

export default function VideoResult({ data }: VideoResultProps) {
  // Group medias by type (video/audio)
  const videoFormats = data.medias.filter(m => 
    m.quality.includes('mp4') || m.quality.includes('webm')
  );
  const audioFormats = data.medias.filter(m => 
    m.quality.includes('m4a') || m.quality.includes('opus')
  );

  const handleDownload = (url: string, quality: string) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    // Generate filename from video title and quality
    const fileExt = quality.includes('webm') ? 'webm' : 'mp4';
    const sanitizedTitle = data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${sanitizedTitle}_${quality.replace(/[^a-z0-9]/gi, '')}.${fileExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white">
      {/* Video Information */}
      <div className="flex items-start gap-6 mb-6">
        <img 
          src={data.thumbnail} 
          alt={data.title}
          className="w-64 h-36 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-xl font-bold mb-2">{data.title}</h2>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaClock className="text-blue-400" />
            <span>{data.duration}</span>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="space-y-4">
        {/* Video Formats */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaVideo className="text-blue-400" />
            Video Formats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {videoFormats.map((format, index) => (
              <button
                key={index}
                onClick={() => handleDownload(format.url, format.quality)}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-colors"
              >
                <FaDownload className="text-blue-400" />
                <span>{format.quality}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Formats */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaVideo className="text-blue-400" />
            Audio Only
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {audioFormats.map((format, index) => (
              <button
                key={index}
                onClick={() => handleDownload(format.url, format.quality)}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-colors"
              >
                <FaDownload className="text-blue-400" />
                <span>{format.quality}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 