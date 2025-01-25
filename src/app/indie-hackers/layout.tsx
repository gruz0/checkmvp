import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lean Validation for Indie Hackers | CheckMVP',
  description:
    "Stop guessing and start validating. CheckMVP's AI gives you the market, audience, and competitor insights you need—no code required.",
}

export default function IndieHackersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
