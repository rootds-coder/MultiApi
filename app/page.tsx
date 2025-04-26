import { API_ENDPOINTS } from './types/api';
import ApiCard from './components/ApiCard';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Multi-API Dashboard @rootds-coder
          </h1>
          <p className="text-xl text-gray-300">
            Access multiple API services in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {API_ENDPOINTS.map((endpoint) => (
            <ApiCard key={endpoint.name} endpoint={endpoint} />
          ))}
        </div>
      </div>
    </main>
  );
}
