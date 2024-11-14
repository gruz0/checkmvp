import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CheckMVP: Validate Your Startup Idea with AI-Powered Insights',
  description:
    'Transform your raw idea into a validated concept. CheckMVP uses AI to help developers, indie hackers, and founders identify their market, audience, and potential.',
}

export default function StartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
