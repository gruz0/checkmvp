import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Validate Your Startup Idea Before You Code | CheckMVP',
  description:
    'Build a stronger foundation for your startup. CheckMVP offers AI-driven validation, market insights, and early traction advice—no coding required.',
}

export default function StartupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
