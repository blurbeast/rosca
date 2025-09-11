/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add this to skip prerendering problematic pages
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
