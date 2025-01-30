import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Validate Your Side Project Without Writing Code | CheckMVP',
  description:
    "Discover your side project's potential before you commit a single line of code. CheckMVP helps busy 9-to-5 developers validate ideas fast.",
  openGraph: {
    title: 'CheckMVP for Developers',
    description:
      "If you're juggling a full-time job yet itching to build a side project, the last thing you want is to waste your limited free time.",
  },
}

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
