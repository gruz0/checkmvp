import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
    noarchive: true,
  },
}

export default function ConceptLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
