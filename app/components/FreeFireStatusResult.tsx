import React from 'react';
import { FaUser, FaGlobe, FaBan, FaCheckCircle } from 'react-icons/fa';

interface FreeFireStatusData {
  nickname: string;
  region: string;
  ban_status: string;
  ban_period: string | null;
}

interface FreeFireStatusResultProps {
  data: FreeFireStatusData;
}

export default function FreeFireStatusResult({ data }: FreeFireStatusResultProps) {
  const isBanned = data.ban_status.toLowerCase() !== 'not banned';
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-full mr-4">
          <FaUser className="text-yellow-500 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{data.nickname}</h2>
          <p className="text-gray-400">Free Fire Account Status</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaGlobe className="text-blue-400 mr-2" />
            <span className="text-gray-300">Region</span>
          </div>
          <p className="text-white font-medium">{data.region}</p>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            {isBanned ? (
              <FaBan className="text-red-400 mr-2" />
            ) : (
              <FaCheckCircle className="text-green-400 mr-2" />
            )}
            <span className="text-gray-300">Account Status</span>
          </div>
          <p className={`font-medium ${isBanned ? 'text-red-400' : 'text-green-400'}`}>
            {data.ban_status}
          </p>
        </div>
      </div>
      
      {isBanned && data.ban_period && (
        <div className="mt-4 bg-red-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <FaBan className="text-red-400 mr-2" />
            <span className="text-red-400 font-medium">Ban Period: {data.ban_period}</span>
          </div>
        </div>
      )}
    </div>
  );
} 