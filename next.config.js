/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'arclightbase.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.warcraftrumble.blizzard.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'fr',
    },
    trailingSlash: true,
};

module.exports = nextConfig;
