import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionComparison from './SectionComparison'
import SectionCompetitor from './SectionCompetitor'
import SectionDifferentiationSuggestions from './SectionDifferentiationSuggestions'

interface Props {
  ideaId: string
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
  ideaId,
  competitors,
  comparison,
  differentiationSuggestions,
}: Props) => (
  <MainContainer ideaId={ideaId} activePath="competitors" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        👥 Competitor Overview
      </h1>
    </div>

    <Paragraph>
      This section highlights the main players in your space, showing you who
      else is offering similar solutions. Understanding your competitors can
      help you identify what makes your product unique and where there might be
      gaps in the market that you can fill. It&apos;s all about knowing your
      landscape!
    </Paragraph>

    <HorizontalLine />

    {competitors.map((competitor, idx) => (
      <React.Fragment key={idx}>
        <SectionCompetitor
          key={idx}
          position={idx + 1}
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

    <HorizontalLine />
  </MainContainer>
)
