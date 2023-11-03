/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/taskboard',
          permanent: false
        },
      ];
    },
  };
  
  module.exports = nextConfig;