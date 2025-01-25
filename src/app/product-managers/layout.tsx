import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Streamline Feature Validation for Product Managers | CheckMVP',
  description:
    "Reduce guesswork in your product roadmap. CheckMVP's AI provides quick idea validation, competitor analysis, and user insights before coding.",
}

export default function ProductManagersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
