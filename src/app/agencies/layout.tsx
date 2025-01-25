import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deliver Validated MVPs for Your Clients | CheckMVP',
  description:
    "Elevate your agency's process. Use CheckMVP to validate client ideas up front—no coding required. Win trust, reduce scope creep.",
}

export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
