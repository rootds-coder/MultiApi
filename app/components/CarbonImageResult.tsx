import React, { useEffect, useState } from 'react';
import { FaImage, FaDownload } from 'react-icons/fa';

interface CarbonImageResultProps {
  data: any; // Can be a string (direct URL), a Blob, or an object with image_url
}

const CarbonImageResult: React.FC<CarbonImageResultProps> = ({ data }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // If data is a string, it's a direct image URL
    if (typeof data === 'string') {
      setImageUrl(data);
      return;
    }

    // If data is an object with image_url property
    if (data?.image_url) {
      setImageUrl(data.image_url);
      return;
    }

    // If data is a Blob
    if (data instanceof Blob) {
      const url = URL.createObjectURL(data);
      setImageUrl(url);

      // Clean up the blob URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [data]);

  if (!imageUrl) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        No image data available
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <FaImage className="text-2xl text-gray-400" />
        <h3 className="text-xl font-semibold text-white">Carbon Image</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-black/30 p-4 rounded-lg">
          <img 
            src={imageUrl} 
            alt="Carbon generated image" 
            className="w-full h-auto rounded-lg mb-4"
          />
          <a 
            href={imageUrl}
            download="carbon-image.png"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <FaDownload />
            <span>Download Image</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarbonImageResult; 