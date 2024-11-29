import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  productionBrowserSourceMaps: false,
  experimental: {
    instrumentationHook: true,
  },
}

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // The authentication token to use for all communication with Sentry.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#configure-source-maps
  authToken: process.env.SENTRY_AUTH_TOKEN,
})
