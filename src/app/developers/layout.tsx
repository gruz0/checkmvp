import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Validate Your Side Project Without Writing Code | CheckMVP',
  description:
    "Discover your side project's potential before you commit a single line of code. CheckMVP helps busy 9‑to‑5 developers validate ideas fast.",
}

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
