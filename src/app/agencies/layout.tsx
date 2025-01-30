import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deliver Validated MVPs for Your Clients | CheckMVP',
  description:
    'Use CheckMVP to validate client ideas up front—no coding required. Win trust, reduce scope creep.',
  openGraph: {
    title: 'CheckMVP for Software Development Agencies',
    description:
      'If you dive right into development, you may end up pivoting mid-project, leading to scope creep, extra costs, and less profit',
  },
}

export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
