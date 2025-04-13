import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.t.me', // libera imagens do Telegram
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com', // libera fotos de perfil do Google
      },
    ],
  },
};

export default nextConfig;
