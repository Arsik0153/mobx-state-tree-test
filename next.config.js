/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    UPLOAD_KEY: process.env.UPLOAD_KEY,
    BASE_URL: process.env.BASE_URL,
    UPLOAD_URL: process.env.UPLOAD_URL,
  }
}

module.exports = nextConfig
