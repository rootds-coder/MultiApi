'use client';

import React from 'react';
import { FaUser, FaIdCard, FaGlobe, FaCalendarAlt, FaBan, FaClock } from 'react-icons/fa';

interface FreeFireData {
  status?: number;
  name?: string;
  id?: string;
  region?: string;
  account_creation_date?: string;
  is_banned?: number;
  ban_period?: number;
  [key: string]: any;
}

interface FreeFireResultProps {
  data: FreeFireData;
}

export default function FreeFireResult({ data }: FreeFireResultProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const [day, month, year] = dateString.split('/');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-gray-900/90 rounded-xl p-6 backdrop-blur-lg border border-gray-700/50">
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
          <FaUser className="text-4xl text-yellow-500" />
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">{data.name || 'Unknown Player'}</h2>
        <p className="text-gray-400">Free Fire Player Information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaIdCard className="text-blue-400 mr-2" />
            <h3 className="text-gray-300 font-medium">Player ID</h3>
          </div>
          <p className="text-white text-lg font-semibold">{data.id || 'Unknown'}</p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaGlobe className="text-green-400 mr-2" />
            <h3 className="text-gray-300 font-medium">Region</h3>
          </div>
          <p className="text-white text-lg font-semibold">{data.region || 'Unknown'}</p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="text-purple-400 mr-2" />
            <h3 className="text-gray-300 font-medium">Account Creation Date</h3>
          </div>
          <p className="text-white text-lg font-semibold">
            {data.account_creation_date ? formatDate(data.account_creation_date) : 'Unknown'}
          </p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaBan className={data.is_banned === 1 ? "text-red-400 mr-2" : "text-green-400 mr-2"} />
            <h3 className="text-gray-300 font-medium">Account Status</h3>
          </div>
          <p className={`text-lg font-semibold ${data.is_banned === 1 ? "text-red-400" : "text-green-400"}`}>
            {data.is_banned === 1 ? 'Banned' : 'Active'}
          </p>
        </div>

        {data.is_banned === 1 && data.ban_period && (
          <div className="bg-gray-800/50 p-4 rounded-lg md:col-span-2">
            <div className="flex items-center mb-2">
              <FaClock className="text-red-400 mr-2" />
              <h3 className="text-gray-300 font-medium">Ban Period</h3>
            </div>
            <p className="text-white text-lg font-semibold">{data.ban_period} days</p>
          </div>
        )}
      </div>
    </div>
  );
} 