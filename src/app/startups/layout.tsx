import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Validate Your Startup Idea Before You Code | CheckMVP',
  description:
    'Build a stronger foundation for your startup. CheckMVP offers AI-driven validation, market insights, and early traction advice—no coding required.',
  openGraph: {
    title: 'CheckMVP for Startup Founders and Early-Stage Entrepreneurs',
    description:
      "You're excited about your new venture, but investors and potential co-founders want proof your idea has legs. Going in blind could mean burning through your runway without clear traction.",
  },
}

export default function StartupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
