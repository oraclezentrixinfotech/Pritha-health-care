/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    experimental: {
        serverActions: {
            bodySizeLimit: "9mb",
        },
    },
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "res.cloudinary.com",
        }, ],
    },
};
export default nextConfig;