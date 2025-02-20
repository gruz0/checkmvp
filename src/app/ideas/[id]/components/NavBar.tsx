'use client'

import Link from 'next/link'
import React from 'react'

const getItemClassName = (isActive: boolean, isDisabled: boolean) =>
  `block rounded px-4 py-2 ${
    isDisabled
      ? 'cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-800'
      : isActive
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
  reportIsReady?: boolean
}

export const NavBar: React.FC<Props> = ({
  ideaId,
  activePath,
  reportIsReady,
}) => (
  <nav className="space-y-1">
    {MENU_ITEMS.map(({ path, label, emoji }) => {
      const fullPath = `/ideas/${ideaId}${path ? `/${path}` : ''}`
      const isDisabled = !reportIsReady && path !== ''

      return (
        <Link
          key={path || 'context'}
          href={isDisabled ? '#' : fullPath}
          className={getItemClassName(activePath === path, isDisabled)}
          onClick={(e) => isDisabled && e.preventDefault()}
        >
          <span className="inline-block w-6">
            {!reportIsReady && path !== '' ? '⏳' : emoji}
          </span>{' '}
          {label}
        </Link>
      )
    })}
  </nav>
)
