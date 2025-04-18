import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/user',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
