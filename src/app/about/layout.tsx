import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About CheckMVP – Build Products People Love with Confidence',
  description:
    'Discover the story behind CheckMVP, the AI tool helping developers, indie hackers, and founders to validate ideas and build products people will love.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
