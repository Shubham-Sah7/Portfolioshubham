import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95, 100],
  },
  async headers() {
    return [
      {
        source: '/lab/walkman',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'autoplay=*',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
