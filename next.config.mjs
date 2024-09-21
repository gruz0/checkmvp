/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  productionBrowserSourceMaps: false,
}

import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  analyzerMode: 'static',
  logLevel: 'info',
})

export default bundleAnalyzer(nextConfig)
