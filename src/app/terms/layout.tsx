import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service – CheckMVP',
  description:
    "These Terms of Service outline the rules and regulations for the use of CheckMVP's services.",
  openGraph: {
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
