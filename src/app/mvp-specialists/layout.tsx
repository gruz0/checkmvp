import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deliver Data-Driven MVPs for Your Clients | CheckMVP',
  description:
    'MVP specialists and consultants: Validate ideas for your clients with AI-driven insights. Shorten the feedback loop and keep projects lean.',
}

export default function MVPSpecialistsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
