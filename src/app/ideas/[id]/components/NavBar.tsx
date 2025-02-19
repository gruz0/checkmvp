import Link from 'next/link'
import React from 'react'

const className =
  'block rounded px-4 py-2 text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-200'

type Props = {
  ideaId: string
}

export const NavBar = ({ ideaId }: Props) => (
  <nav className="space-y-1">
    <Link href={`/ideas/${ideaId}`} className={className}>
      <span className="inline-block w-6">🔎</span> Context
    </Link>
    <Link href={`/ideas/${ideaId}/market_analysis`} className={className}>
      <span className="inline-block w-6">📊</span> Market Analysis
    </Link>
    <Link href={`/ideas/${ideaId}/target_audience`} className={className}>
      <span className="inline-block w-6">🎯</span> Target Audience
    </Link>
    <Link href={`/ideas/${ideaId}/competitors`} className={className}>
      <span className="inline-block w-6">👥</span> Competitors
    </Link>
    <Link href={`/ideas/${ideaId}/value_proposition`} className={className}>
      <span className="inline-block w-6">💎</span> Value Proposition
    </Link>
    <Link href={`/ideas/${ideaId}/swot`} className={className}>
      <span className="inline-block w-6">⚖️</span> SWOT Analysis
    </Link>
    <Link href={`/ideas/${ideaId}/elevator_pitches`} className={className}>
      <span className="inline-block w-6">🎤</span> Elevator Pitch
    </Link>
    <Link href={`/ideas/${ideaId}/product_names`} className={className}>
      <span className="inline-block w-6">✨</span> Product Names
    </Link>
    <Link href={`/ideas/${ideaId}/google_trends`} className={className}>
      <span className="inline-block w-6">📈</span> Google Trends
    </Link>
    <Link href={`/ideas/${ideaId}/marketing`} className={className}>
      <span className="inline-block w-6">💡</span> Content Ideas
    </Link>
    <Link href={`/ideas/${ideaId}/two_week_testing_plan`} className={className}>
      <span className="inline-block w-6">📅</span> Two-Week Plan
    </Link>
  </nav>
)
