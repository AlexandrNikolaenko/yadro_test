/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: '.dist',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
                port: '',
                pathname: '/gh/faker-js/**',
                search: ''
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
                search: ''
            }
        ]
    }
};

export default nextConfig;
