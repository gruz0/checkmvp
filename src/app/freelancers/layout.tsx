import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stand Out with Data-Driven Freelance Proposals | CheckMVP',
  description:
    'Use CheckMVP to evaluate client projects before you bid. Show real market insights, competitor analysis, and precise value propositions in your proposals.',
  openGraph: {
    title: 'CheckMVP for Freelancers',
    description:
      "When you bid for a project online, you're competing with dozens—sometimes hundreds—of other freelancers. Standing out is essential.",
    type: 'website',
  },
}

export default function FreelancersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
