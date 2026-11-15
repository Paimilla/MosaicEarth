/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produce plain HTML/CSS/JS for the static hosting included with the offer.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
