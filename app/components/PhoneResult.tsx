'use client';

import React from 'react';
import { FaPhone, FaUser, FaMapMarkerAlt, FaGlobe, FaMobile, FaHome, FaCity, FaSimCard, FaNetworkWired, FaFingerprint, FaDesktop, FaWifi, FaMapMarkedAlt, FaBroadcastTower, FaIdCard, FaHistory, FaExclamationTriangle } from 'react-icons/fa';

interface PhoneData {
  Number?: string;
  "Owner Name"?: string;
  "Owner Address"?: string;
  "Owner Personality"?: string;
  Country?: string;
  "Mobile State"?: string;
  Hometown?: string;
  "Reference City"?: string;
  "SIM card"?: string;
  Connection?: string;
  "IMEI number"?: string;
  "IP address"?: string;
  "MAC address"?: string;
  "Mobile Locations"?: string;
  "Tower Locations"?: string;
  "Tracker Id"?: string;
  "Tracking History"?: string;
  Complaints?: string;
  Language?: string;
  [key: string]: string | undefined;
}

interface PhoneResultProps {
  data: PhoneData;
}

export default function PhoneResult({ data }: PhoneResultProps) {
  const sections = [
    {
      title: "Basic Information",
      icon: <FaPhone className="text-blue-500" />,
      items: [
        { key: "Number", icon: <FaPhone className="text-blue-400" /> },
        { key: "Owner Name", icon: <FaUser className="text-green-400" /> },
        { key: "Owner Address", icon: <FaMapMarkerAlt className="text-red-400" /> },
        { key: "Owner Personality", icon: <FaUser className="text-purple-400" /> },
      ]
    },
    {
      title: "Location Details",
      icon: <FaGlobe className="text-green-500" />,
      items: [
        { key: "Country", icon: <FaGlobe className="text-blue-400" /> },
        { key: "Mobile State", icon: <FaMapMarkerAlt className="text-green-400" /> },
        { key: "Hometown", icon: <FaHome className="text-yellow-400" /> },
        { key: "Reference City", icon: <FaCity className="text-red-400" /> },
        { key: "Mobile Locations", icon: <FaMapMarkedAlt className="text-purple-400" /> },
        { key: "Tower Locations", icon: <FaBroadcastTower className="text-indigo-400" /> },
      ]
    },
    {
      title: "Device Information",
      icon: <FaMobile className="text-purple-500" />,
      items: [
        { key: "SIM card", icon: <FaSimCard className="text-blue-400" /> },
        { key: "Connection", icon: <FaNetworkWired className="text-green-400" /> },
        { key: "IMEI number", icon: <FaFingerprint className="text-yellow-400" /> },
        { key: "IP address", icon: <FaDesktop className="text-red-400" /> },
        { key: "MAC address", icon: <FaWifi className="text-purple-400" /> },
      ]
    },
    {
      title: "Tracking Information",
      icon: <FaIdCard className="text-red-500" />,
      items: [
        { key: "Tracker Id", icon: <FaIdCard className="text-blue-400" /> },
        { key: "Tracking History", icon: <FaHistory className="text-green-400" /> },
        { key: "Complaints", icon: <FaExclamationTriangle className="text-yellow-400" /> },
        { key: "Language", icon: <FaGlobe className="text-purple-400" /> },
      ]
    }
  ];

  return (
    <div className="bg-gray-900/90 rounded-xl p-6 backdrop-blur-lg border border-gray-700/50">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700/30">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full mr-3">
                {section.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map(({ key, icon }) => (
                data[key] && (
                  <div 
                    key={key}
                    className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full flex-shrink-0">
                        {icon}
                      </div>
                      <div>
                        <h4 className="text-gray-300 text-sm font-medium">{key}</h4>
                        <p className="text-white font-semibold mt-1 break-words">
                          {data[key]}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 