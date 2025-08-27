// next.config.js
/** @type {import('next').NextConfig} */

const repoName = 'your-repo-name'; // IMPORTANT: REPLACE WITH YOUR REPOSITORY NAME

const nextConfig = {
  reactStrictMode: true,
  
  // Configure Next.js to export a static site
  output: 'export',

  // Set the base path for the project
  // This is the subdirectory on GitHub Pages where the site will be served
  basePath: `/${repoName}`,

  // Set the asset prefix to the same value as the base path
  assetPrefix: `/${repoName}/`,

  // Since we are exporting a static site, we must disable image optimization
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;