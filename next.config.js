/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['th-post-data.s3.eu-central-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'th-post-data.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 