/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
            {
                source: '/:path*',
                destination: '/api/:path*',
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'POST',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization, Api-Version, Api-Language, Accept',
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig;