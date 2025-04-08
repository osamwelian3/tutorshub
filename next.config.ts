import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'files.elfsightcdn.com',
      pathname: '**'
    }]
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `http://ec2-13-61-162-248.eu-north-1.compute.amazonaws.com:4000/uploads/:path*`, // Proxy to the custom server
      },
    ];
  },
};

export default nextConfig;
