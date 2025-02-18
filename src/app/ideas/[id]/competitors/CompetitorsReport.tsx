import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
import SectionComparison from './SectionComparison'
import SectionCompetitor from './SectionCompetitor'
import SectionDifferentiationSuggestions from './SectionDifferentiationSuggestions'

interface Props {
  id: string
  competitors: Array<{
    name: string
    productName: string
    url: string
    coreFeatures: string[]
    valueProposition: string
    userAcquisition: string
    strengths: string[]
    weaknesses: string[]
    differentiationOpportunity: string
  }>
  comparison: {
    strengths: string[]
    weaknesses: string[]
  }
  differentiationSuggestions: string[]
}

export const CompetitorsReport = ({
  competitors,
  comparison,
  differentiationSuggestions,
}: Props) => (
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar />
      </aside>

      <div className="flex-1 md:pl-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
            👥 Competitor Overview
          </h1>
        </div>

        <Paragraph>
          This section highlights the main players in your space, showing you
          who else is offering similar solutions. Understanding your competitors
          can help you identify what makes your product unique and where there
          might be gaps in the market that you can fill. It&apos;s all about
          knowing your landscape!
        </Paragraph>

        <HorizontalLine />

        {competitors.map((competitor, idx) => (
          <React.Fragment key={idx}>
            <SectionCompetitor
              key={idx}
              id={idx.toString()}
              competitor={competitor}
            />

            <HorizontalLine />
          </React.Fragment>
        ))}

        <SectionComparison comparison={comparison} />

        <HorizontalLine />

        <SectionDifferentiationSuggestions
          differentiationSuggestions={differentiationSuggestions}
        />
      </div>
    </div>

    <BackToTopButton />
  </div>
)
