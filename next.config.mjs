/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/landing', destination: '/', permanent: true },
      { source: '/pro/professional', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
