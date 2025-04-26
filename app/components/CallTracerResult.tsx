'use client';

interface CallTracerData {
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
  [key: string]: string | undefined;
}

interface CallTracerResultProps {
  data: CallTracerData;
}

export default function CallTracerResult({ data }: CallTracerResultProps) {
  const gridItems = [
    { key: 'Number', icon: '📱' },
    { key: 'Owner Name', icon: '👤' },
    { key: 'Owner Address', icon: '🏠' },
    { key: 'Owner Personality', icon: '🎭' },
    { key: 'Country', icon: '🌍' },
    { key: 'Mobile State', icon: '📍' },
    { key: 'Hometown', icon: '🏡' },
    { key: 'Reference City', icon: '🌆' },
    { key: 'SIM card', icon: '💳' },
    { key: 'Connection', icon: '📡' },
    { key: 'IMEI number', icon: '🔢' },
    { key: 'IP address', icon: '🌐' },
    { key: 'MAC address', icon: '💻' },
    { key: 'Mobile Locations', icon: '📍' },
    { key: 'Tower Locations', icon: '🗼' },
    { key: 'Tracker Id', icon: '🏷️' },
    { key: 'Tracking History', icon: '📊' },
    { key: 'Complaints', icon: '⚠️' },
  ];

  return (
    <div className="bg-gray-900/90 rounded-xl p-6 backdrop-blur-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gridItems.map(({ key, icon }) => (
          data[key] && (
            <div 
              key={key}
              className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl" role="img" aria-label={key}>
                  {icon}
                </span>
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
  );
} 