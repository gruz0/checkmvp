import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meet the Supporters of CheckMVP',
  description:
    'These amazing individuals may not have directly contributed to building CheckMVP, but their support has been invaluable to me on this journey.',
}

export default function SupportersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
