import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lean Validation for Indie Hackers | CheckMVP',
  description:
    "Stop guessing and start validating. CheckMVP's AI gives you the market, audience, and competitor insights you need—no code required.",
  openGraph: {
    title: 'CheckMVP for Indie Hackers',
    description:
      "As an indie hacker, you're often working alone or with a tiny team. Every step you take counts, and building a product nobody wants could burn you out fast.",
    type: 'website',
  },
}

export default function IndieHackersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
