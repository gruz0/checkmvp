'use client'

import Link from 'next/link'
import React, { useState } from 'react'

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
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile burger menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-4 z-50 rounded-lg bg-gray-100 p-2 shadow-lg md:hidden dark:bg-gray-900"
        aria-label="Toggle menu"
      >
        <div className="space-y-1.5">
          <span
            className={`block h-0.5 w-6 bg-gray-600 transition-transform duration-300 dark:bg-gray-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-600 transition-opacity duration-300 dark:bg-gray-300 ${isOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-600 transition-transform duration-300 dark:bg-gray-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      <div
        role="button"
        tabIndex={0}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            setIsOpen(false)
          }
        }}
      />

      {/* Navigation menu - desktop and mobile */}
      <nav
        className={`space-y-1 md:block ${
          isOpen
            ? 'fixed right-4 top-16 z-40 w-64 rounded-lg bg-gray-100 p-2 shadow-lg dark:bg-gray-900'
            : 'hidden'
        }`}
      >
        {MENU_ITEMS.map(({ path, label, emoji }) => {
          const fullPath = `/ideas/${ideaId}${path ? `/${path}` : ''}`
          const isDisabled = !reportIsReady && path !== ''

          return (
            <Link
              key={path || 'context'}
              href={isDisabled ? '#' : fullPath}
              className={getItemClassName(activePath === path, isDisabled)}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault()
                } else {
                  setIsOpen(false)
                }
              }}
            >
              <span className="inline-block w-6">
                {!reportIsReady && path !== '' ? '⏳' : emoji}
              </span>{' '}
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
