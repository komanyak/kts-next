import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: ['./src/shared/styles'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-school.minio.ktsdev.ru',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig