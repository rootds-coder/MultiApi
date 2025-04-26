'use client';

import React from 'react';
import { FaSpotify, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

interface SpotifyData {
  status?: boolean;
  id?: string;
  title?: string;
  artist?: string;
  album?: string;
  cover?: string;
  duration?: string;
  releaseDate?: string;
  spotify_url?: string;
  download_link?: string;
  error?: string;
  message?: string;
  [key: string]: any;
}

interface SpotifyResultProps {
  data: SpotifyData | SpotifyData[] | string;
}

export default function SpotifyResult({ data }: SpotifyResultProps) {
  console.log('SpotifyResult received data:', data);

  // Handle string responses (usually error messages)
  if (typeof data === 'string') {
    return (
      <div className="bg-red-900/30 text-red-200 p-4 rounded-lg mb-4 backdrop-blur-sm">
        {data}
      </div>
    );
  }

  // Convert array to single object if needed
  const responseData: SpotifyData = Array.isArray(data) ? data[0] : data;

  // Handle error objects and status: false responses
  if ('error' in responseData || 'message' in responseData || responseData.status === false) {
    return (
      <div className="bg-red-900/30 text-red-200 p-4 rounded-lg mb-4 backdrop-blur-sm">
        {responseData.error || responseData.message || 'An error occurred'}
      </div>
    );
  }

  // Handle invalid or empty data
  if (!responseData || typeof responseData !== 'object') {
    return (
      <div className="bg-yellow-900/30 text-yellow-200 p-4 rounded-lg mb-4 backdrop-blur-sm">
        No song data available. Please try a different search term or Spotify URL.
      </div>
    );
  }

  const handleDownload = async (url: string | undefined) => {
    if (!url) {
      console.error('Download URL is missing');
      return;
    }

    try {
      console.log('Attempting to download from URL:', url);
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="bg-gray-900/90 rounded-xl p-6 backdrop-blur-lg border border-gray-700/50">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-green-500/20 rounded-full mr-4">
          <FaSpotify className="text-green-500 text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Spotify Track</h2>
          <p className="text-gray-400">Song Information</p>
        </div>
      </div>

      {responseData.cover && (
        <div className="flex justify-center mb-6">
          <img 
            src={responseData.cover} 
            alt={responseData.title || 'Album cover'} 
            className="w-48 h-48 rounded-lg shadow-lg border border-gray-700/50"
          />
        </div>
      )}
      
      <div className="space-y-6">
        {responseData.title && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">{responseData.title}</h3>
            {responseData.artist && (
              <p className="text-lg text-gray-300 mt-2">{responseData.artist}</p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {responseData.album && (
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="text-sm text-gray-400 mb-1">Album</h4>
              <p className="text-white font-medium">{responseData.album}</p>
            </div>
          )}
          
          {responseData.duration && (
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="text-sm text-gray-400 mb-1">Duration</h4>
              <p className="text-white font-medium">{responseData.duration}</p>
            </div>
          )}
          
          {responseData.releaseDate && (
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="text-sm text-gray-400 mb-1">Release Date</h4>
              <p className="text-white font-medium">{responseData.releaseDate}</p>
            </div>
          )}
          
          {responseData.id && (
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="text-sm text-gray-400 mb-1">Spotify ID</h4>
              <p className="text-white font-medium">{responseData.id}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          {responseData.download_link && (
            <button
              onClick={() => handleDownload(responseData.download_link)}
              className="w-full bg-green-600/80 hover:bg-green-700/80 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-3 backdrop-blur-sm"
            >
              <FaDownload className="text-xl" />
              <span className="font-medium">Download Song</span>
            </button>
          )}
          
          {responseData.spotify_url && (
            <a 
              href={responseData.spotify_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-3 backdrop-blur-sm"
            >
              <FaExternalLinkAlt className="text-xl" />
              <span className="font-medium">Open in Spotify</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 