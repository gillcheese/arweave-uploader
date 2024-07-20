/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PRIVATE_RPC_URL: process.env.PRIVATE_RPC_URL,
  },
  publicRuntimeConfig: {
    RPC_URL: process.env.PRIVATE_RPC_URL,
  },
}

export default nextConfig;