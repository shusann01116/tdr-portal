/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  async redirects() {
    return [
      {
        source: "/standby",
        destination: "/standby/tdl",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "*.tokyodisneyresort.jp",
      },
    ],
  },
};

export default nextConfig;
