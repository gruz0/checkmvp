import Link from 'next/link'
import React from 'react'

const getItemClassName = (isActive: boolean) =>
  `block rounded px-4 py-2 ${
    isActive
      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
      : 'text-gray-900 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
  }`

type MenuItem = {
  path: string
  label: string
  emoji: string
}

const MENU_ITEMS: MenuItem[] = [
  { path: '', label: 'Context', emoji: '🔎' },
  { path: 'market_analysis', label: 'Market Analysis', emoji: '📊' },
  { path: 'target_audience', label: 'Target Audience', emoji: '🎯' },
  { path: 'competitors', label: 'Competitors', emoji: '👥' },
  { path: 'value_proposition', label: 'Value Proposition', emoji: '💎' },
  { path: 'swot', label: 'SWOT Analysis', emoji: '⚖️' },
  { path: 'elevator_pitches', label: 'Elevator Pitches', emoji: '🎤' },
  { path: 'product_names', label: 'Product Names', emoji: '✨' },
  { path: 'google_trends', label: 'Google Trends', emoji: '📈' },
  { path: 'marketing', label: 'Content Ideas', emoji: '💡' },
  { path: 'two_week_testing_plan', label: 'Two-Week Plan', emoji: '📅' },
]

type Props = {
  ideaId: string
  activePath: string
}

export const NavBar: React.FC<Props> = ({ ideaId, activePath }) => (
  <nav className="space-y-1">
    {MENU_ITEMS.map(({ path, label, emoji }) => {
      const fullPath = `/ideas/${ideaId}${path ? `/${path}` : ''}`
      return (
        <Link
          key={path || 'context'}
          href={fullPath}
          className={getItemClassName(activePath === path)}
        >
          <span className="inline-block w-6">{emoji}</span> {label}
        </Link>
      )
    })}
  </nav>
)
