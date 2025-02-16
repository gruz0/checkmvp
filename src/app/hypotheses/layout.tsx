import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
    noarchive: true,
  },
}

export default function HypothesisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
