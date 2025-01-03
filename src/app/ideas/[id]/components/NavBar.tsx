import Link from 'next/link'
import React from 'react'

const className =
  'block rounded px-4 py-2 text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-200'

export const NavBar = () => (
  <nav className="space-y-1">
    <Link href="#context" className={className}>
      Context
    </Link>
    <Link href="#market_analysis" className={className}>
      Market Analysis
    </Link>
    <Link href="#competitor_overview" className={className}>
      Competitors
    </Link>
    <Link href="#value_proposition" className={className}>
      Value Proposition
    </Link>
    <Link href="#target_audiences" className={className}>
      Target Audiences
    </Link>
    <Link href="#swot_analysis" className={className}>
      SWOT Analysis
    </Link>
    <Link href="#elevator_pitch" className={className}>
      Elevator Pitch
    </Link>
    <Link href="#product_names" className={className}>
      Product Names
    </Link>
    <Link href="#google_trends" className={className}>
      Google Trends
    </Link>
    <Link href="#content_ideas" className={className}>
      Content Ideas
    </Link>
    <Link
      href="#actionable_next_steps"
      className="block rounded px-4 py-2 text-gray-500"
    >
      Next Steps
    </Link>
    <Link
      href="#two_week_testing_plan"
      className="block rounded px-4 py-2 text-gray-500"
    >
      Two-Week Testing Plan
    </Link>
    <Link
      href="#estimated_costs"
      className="block rounded px-4 py-2 text-gray-500"
    >
      Estimated Costs
    </Link>
    <Link
      href="#early_adopters"
      className="block rounded px-4 py-2 text-gray-500"
    >
      Early Adopters
    </Link>
    <Link
      href="#networking_opportunities"
      className="block rounded px-4 py-2 text-gray-500"
    >
      Networking
    </Link>
    <Link
      href="#feedback_templates"
      className="block rounded px-4 py-2 text-gray-500"
    >
      Feedback Templates
    </Link>
    <Link href="#pitch_deck" className="block rounded px-4 py-2 text-gray-500">
      Pitch Deck
    </Link>
    <Link href="#roadmap" className="block rounded px-4 py-2 text-gray-500">
      Roadmap
    </Link>
    <Link
      href="#tools_and_resources"
      className="block rounded px-4 py-2 text-gray-500"
    >
      Tools & Resources
    </Link>
  </nav>
)
