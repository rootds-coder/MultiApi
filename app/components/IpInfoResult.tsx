import React from 'react';
import { FaGlobe, FaMapMarkerAlt, FaBuilding, FaNetworkWired, FaClock } from 'react-icons/fa';

interface IpInfoResponse {
  status: string;
  query: {
    ip_address: string;
    country: {
      name: string;
      code: string;
      region: string;
      city: string;
      timezone: string;
      zip_code: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
    internet_service_provider: {
      isp: string;
      organization: string;
      as: string;
    };
    details: {
      is_in_eu: boolean;
      continent: string;
      country_code: string;
      region_code: string;
      city: string;
    };
    map_links: {
      google_maps: string;
      openstreetmap: string;
    };
  };
}

interface IpInfoResultProps {
  data: IpInfoResponse;
}

export default function IpInfoResult({ data }: IpInfoResultProps) {
  if (!data.query) {
    return (
      <div className="bg-red-900/50 text-red-200 p-4 rounded-lg">
        Invalid response format
      </div>
    );
  }

  const { query } = data;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 rounded-full mr-4">
          <FaGlobe className="text-blue-500 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">IP Information</h2>
          <p className="text-gray-400">Details for IP: {query.ip_address}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-red-400 mr-2" />
            <span className="text-gray-300">Location</span>
          </div>
          <p className="text-white">
            {query.country.city}, {query.country.region}
            <br />
            {query.country.name} ({query.country.code})
            {query.country.zip_code && <span> ({query.country.zip_code})</span>}
          </p>
          <div className="flex gap-2 mt-2">
            <a
              href={query.map_links.google_maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm inline-block"
            >
              View on Google Maps
            </a>
            <span className="text-gray-500">|</span>
            <a
              href={query.map_links.openstreetmap}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm inline-block"
            >
              View on OpenStreetMap
            </a>
          </div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaBuilding className="text-purple-400 mr-2" />
            <span className="text-gray-300">Organization</span>
          </div>
          <p className="text-white">{query.internet_service_provider.organization}</p>
          <p className="text-gray-400 text-sm mt-1">ISP: {query.internet_service_provider.isp}</p>
          <p className="text-gray-400 text-sm">{query.internet_service_provider.as}</p>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaNetworkWired className="text-green-400 mr-2" />
            <span className="text-gray-300">Network</span>
          </div>
          <p className="text-white">{query.ip_address}</p>
          <p className="text-gray-400 text-sm mt-1">
            Continent: {query.details.continent !== 'Not available' ? query.details.continent : 'Unknown'}
          </p>
          <p className="text-gray-400 text-sm">
            EU: {query.details.is_in_eu ? 'Yes' : 'No'}
          </p>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaClock className="text-yellow-400 mr-2" />
            <span className="text-gray-300">Timezone</span>
          </div>
          <p className="text-white">{query.country.timezone}</p>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleTimeString('en-US', { timeZone: query.country.timezone })}
          </p>
        </div>
      </div>
    </div>
  );
} 