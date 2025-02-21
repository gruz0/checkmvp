import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hypothesis Generator by CheckMVP',
  description:
    'Transform random ideas into structured business hypotheses with our AI-powered generator. Mix technology, industry trends, and business models to spark innovative startup concepts.',
  openGraph: {
    title: 'Random Business Hypothesis Generator | CheckMVP',
    description:
      'Turn your random ideas into potential business opportunities. Our AI wizard combines tech, industry trends, and business models to generate structured hypotheses ready for validation.',
    type: 'website',
  },
}

export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
