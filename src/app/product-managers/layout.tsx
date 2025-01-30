import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Streamline Feature Validation for Product Managers | CheckMVP',
  description:
    "Reduce guesswork in your product roadmap. CheckMVP's AI provides quick idea validation, competitor analysis, and user insights before coding.",
  openGraph: {
    title: 'CheckMVP for Product Managers',
    description:
      "You're tasked with juggling multiple features, stakeholder demands, and strategic deadlines. Making the wrong call on what to build next can cost your team time and credibility.",
    type: 'website',
  },
}

export default function ProductManagersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
