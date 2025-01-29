import Link from 'next/link'
import React from 'react'

const className =
  'block rounded px-4 py-2 text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-200'

export const NavBar = () => (
  <nav className="space-y-1">
    <Link href="#context" className={className}>
      <span className="inline-block w-6">🔎</span> Context
    </Link>
    <Link href="#market_analysis" className={className}>
      <span className="inline-block w-6">📊</span> Market Analysis
    </Link>
    <Link href="#competitor_overview" className={className}>
      <span className="inline-block w-6">👥</span> Competitors
    </Link>
    <Link href="#value_proposition" className={className}>
      <span className="inline-block w-6">💎</span> Value Proposition
    </Link>
    <Link href="#target_audiences" className={className}>
      <span className="inline-block w-6">🎯</span> Target Audiences
    </Link>
    <Link href="#swot_analysis" className={className}>
      <span className="inline-block w-6">⚖️</span> SWOT Analysis
    </Link>
    <Link href="#elevator_pitch" className={className}>
      <span className="inline-block w-6">🎤</span> Elevator Pitch
    </Link>
    <Link href="#product_names" className={className}>
      <span className="inline-block w-6">✨</span> Product Names
    </Link>
    <Link href="#google_trends" className={className}>
      <span className="inline-block w-6">📈</span> Google Trends
    </Link>
    <Link href="#content_ideas" className={className}>
      <span className="inline-block w-6">💡</span> Content Ideas
    </Link>
    <Link href="#two_week_testing_plan" className={className}>
      <span className="inline-block w-6">📅</span> Two-Week Plan
    </Link>
    <Link
      href="#estimated_costs"
      className="block rounded px-4 py-2 text-gray-500"
    >
      <span className="inline-block w-6">💰</span> Estimated Costs
    </Link>
    <Link
      href="#early_adopters"
      className="block rounded px-4 py-2 text-gray-500"
    >
      <span className="inline-block w-6">🚀</span> Early Adopters
    </Link>
    <Link
      href="#networking_opportunities"
      className="block rounded px-4 py-2 text-gray-500"
    >
      <span className="inline-block w-6">🤝</span> Networking
    </Link>
    <Link
      href="#feedback_templates"
      className="block rounded px-4 py-2 text-gray-500"
    >
      <span className="inline-block w-6">📝</span> Feedback Templates
    </Link>
    <Link href="#pitch_deck" className="block rounded px-4 py-2 text-gray-500">
      <span className="inline-block w-6">🎪</span> Pitch Deck
    </Link>
    <Link href="#roadmap" className="block rounded px-4 py-2 text-gray-500">
      <span className="inline-block w-6">🗺️</span> Roadmap
    </Link>
    <Link
      href="#tools_and_resources"
      className="block rounded px-4 py-2 text-gray-500"
    >
      <span className="inline-block w-6">🛠️</span> Tools & Resources
    </Link>
  </nav>
)
