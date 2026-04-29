/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false,
  transpilePackages: ['three'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
