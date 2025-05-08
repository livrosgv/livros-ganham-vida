import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.telegram.org', // arquivos convertidos do Telegram
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // fotos de perfil Google
      },
      {
        protocol: 'https',
        hostname: 't.me', // links do Telegram (corrigido)
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com', // domínio base do Google (corrigido)
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'livrosganhamvida.com.br', // sem o www
          },
        ],
        destination: 'https://www.livrosganhamvida.com.br/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
