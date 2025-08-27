// next.config.js
/** @type {import('next').NextConfig} */

// Determine if the environment is for production (deployment)
const isProd = process.env.NODE_ENV === 'production';

// Your GitHub repository name, MUST be lowercase to match the GitHub Pages URL
const repoName = 'absawada';

const nextConfig = {
  reactStrictMode: true,
  
  // Static export configuration
  output: 'export',
  images: {
    unoptimized: true,
  },

  // Conditionally set basePath and assetPrefix ONLY for production builds.
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
};

module.exports = nextConfig;