import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deliver Data-Driven MVPs for Your Clients | CheckMVP',
  description:
    'MVP specialists and consultants: Validate ideas for your clients with AI-driven insights. Shorten the feedback loop and keep projects lean.',
  openGraph: {
    title: 'CheckMVP for MVP Specialists and Consultants',
    description:
      "Your clients trust you to guide them from zero to a tangible product. If they question your direction, or if the product doesn't connect with users, your credibility is on the line.",
  },
}

export default function MVPSpecialistsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
