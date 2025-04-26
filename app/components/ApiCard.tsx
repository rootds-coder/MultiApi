'use client';

import React, { useState } from 'react';
import { ApiEndpoint } from '../types/api';
import { FaInstagram, FaSpotify, FaYoutube, FaDownload, FaSearch, FaInfoCircle, FaRobot, FaPhone, FaImage, FaCode, FaInfoCircle as FaInfo } from 'react-icons/fa';
import { callApi } from '../utils/api';
import InstagramResult from './InstagramResult';
import InstagramReelResult from './InstagramReelResult';
import VideoResult from './VideoResult';
import PhoneResult from './PhoneResult';
import SpotifyResult from './SpotifyResult';
import FreeFireResult from './FreeFireResult';
import FreeFireStatusResult from './FreeFireStatusResult';
import AiAssistantResult from './AiAssistantResult';
import IpInfoResult from './IpInfoResult';
import Modal from './Modal';
import CarbonImageResult from './CarbonImageResult';

interface ApiCardProps {
  endpoint: ApiEndpoint;
}

export default function ApiCard({ endpoint }: ApiCardProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setIsModalOpen(true);

    try {
      console.log('Submitting form with param:', input);
      const response = await callApi(endpoint, input);
      console.log('API Response for Spotify:', response);
      console.log('API Response Type:', typeof response);
      console.log('API Response Keys:', Object.keys(response));
      setResult(response);
    } catch (error) {
      console.error('API Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = async (message: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Submitting follow-up message:', message);
      const data = await callApi(endpoint, message);
      console.log('API Response:', data);
      setResult(data);
    } catch (error) {
      console.error('API Error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (endpoint.name.toLowerCase()) {
      case 'instagram username lookup':
        return <FaInstagram className="text-pink-500" />;
      case 'spotify song downloader':
        return <FaSpotify className="text-green-500" />;
      case 'video downloader':
        return <FaYoutube className="text-red-500" />;
      case 'free fire uid info':
      case 'free fire account status':
        return <FaSearch className="text-yellow-500" />;
      case 'gemini ai assistant':
      case 'chatgpt-3':
        return <FaRobot className="text-blue-500" />;
      case 'ip info':
        return <FaInfoCircle className="text-gray-500" />;
      case 'instagram reels downloader':
        return <FaDownload className="text-purple-500" />;
      case 'carbon image generator':
        return <FaImage className="text-cyan-500" />;
      case 'call tracer':
        return <FaPhone className="text-indigo-500" />;
      default:
        return <FaCode className="text-gray-500" />;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (endpoint.name.toLowerCase().includes('carbon image generator')) {
      return <CarbonImageResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('instagram reels downloader')) {
      return <InstagramReelResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('instagram')) {
      return <InstagramResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('video') && result.medias) {
      return <VideoResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('call tracer')) {
      return <PhoneResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('spotify')) {
      return <SpotifyResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('free fire uid info')) {
      return <FreeFireResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('free fire account status')) {
      return <FreeFireStatusResult data={result} />;
    }

    if (endpoint.name.toLowerCase().includes('gemini ai assistant') || 
        endpoint.name.toLowerCase().includes('chatgpt-3')) {
      return <AiAssistantResult data={result} onNewMessage={handleNewMessage} />;
    }

    if (endpoint.name.toLowerCase().includes('ip info')) {
      return <IpInfoResult data={result} />;
    }

    return (
      <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-white">
        {JSON.stringify(result, null, 2)}
      </pre>
    );
  };

  const renderHelperText = () => {
    if (endpoint.name.toLowerCase().includes('spotify')) {
      return (
        <div className="mt-2 text-sm text-gray-400 flex items-start">
          <FaInfo className="text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
          <span>You can enter either a song name (e.g., "Kaise Hua") or a Spotify song URL (e.g., https://open.spotify.com/track/...)</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800/30 rounded-lg p-6 shadow-lg backdrop-blur-md border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-700/50 rounded-full mr-4 backdrop-blur-sm">
          {getIcon()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{endpoint.name}</h2>
          <p className="text-gray-300">{endpoint.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={endpoint.placeholder}
              className="flex-grow bg-gray-700/50 text-white rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600/80 hover:bg-blue-700/80 text-white px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 backdrop-blur-sm"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          {renderHelperText()}
        </div>
      </form>

      {error && (
        <div className="bg-red-900/30 text-red-200 p-4 rounded-lg mb-4 backdrop-blur-sm">
          {error}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={endpoint.name}>
        {renderResult()}
      </Modal>
    </div>
  );
} 