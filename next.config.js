/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
    images: {
      domains: [ 'loremflickr.com', 'cloudflare-ipfs.com','lh3.googleusercontent.com', 'res.cloudinary.com'],
    },
    // disable eslint
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    
}

module.exports = nextConfig
