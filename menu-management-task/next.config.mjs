/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',       // When the user visits the base URL
        destination: '/navigate/menus', // Redirect to this path
        permanent: true,   // Set to true if it's a permanent redirect (301)
      },
    ];
  },
};

export default nextConfig;
