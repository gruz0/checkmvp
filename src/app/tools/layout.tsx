import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Tools for Startups | CheckMVP',
  description:
    'Explore our collection of free AI-powered tools designed specifically for startup founders, indie hackers, and entrepreneurs. From hypothesis generation to market validation.',
  openGraph: {
    title: 'Free AI Tools for Startups and Entrepreneurs | CheckMVP',
    description:
      'Power up your startup journey with our suite of free AI tools. Built by founders, for founders - no registration required.',
    type: 'website',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
