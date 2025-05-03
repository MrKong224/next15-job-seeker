import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
			},
		],
	},
};

export default nextConfig;
