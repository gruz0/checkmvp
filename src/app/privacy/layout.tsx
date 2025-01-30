import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy – CheckMVP',
  description:
    'CheckMVP is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.',
  openGraph: {
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
