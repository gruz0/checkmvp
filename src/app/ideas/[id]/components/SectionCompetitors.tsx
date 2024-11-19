'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionCompetitorsProps {
  onReport: (section: string) => void
  data: {
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
  } | null
}

const SectionCompetitors: React.FC<SectionCompetitorsProps> = ({
  onReport,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="competitor_overview">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_competitor_overview"
      >
        Competitor Overview
      </SectionHeader>

      {isExpanded && (
        <div id="section_competitor_overview">
          <SectionDescription>
            This section highlights the main players in your space, showing you
            who else is offering similar solutions. Understanding your
            competitors can help you identify what makes your product unique and
            where there might be gaps in the market that you can fill. It&apos;s
            all about knowing your landscape!
          </SectionDescription>

          {data ? (
            <>
              {data.competitors.map((competitor, idx) => (
                <Section
                  key={competitor.url}
                  header={`${idx + 1}. ${competitor.name}`}
                  onReport={() =>
                    onReport(`competitor_analysis.competitors.${idx}`)
                  }
                >
                  <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6 lg:pb-0 dark:bg-gray-900">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Product:
                    </h3>
                    <Paragraph>
                      <a
                        href={competitor.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-blue-700 underline hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                      >
                        {competitor.productName}
                      </a>
                    </Paragraph>

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Value Proposition:
                    </h3>
                    <Paragraph>{competitor.valueProposition}</Paragraph>

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      User Acquisition:
                    </h3>
                    <Paragraph>{competitor.userAcquisition}</Paragraph>

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Core Features:
                    </h3>
                    <SimpleUnorderedList items={competitor.coreFeatures} />

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Strengths:
                    </h3>
                    <SimpleUnorderedList items={competitor.strengths} />

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Weaknesses:
                    </h3>
                    <SimpleUnorderedList items={competitor.weaknesses} />

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Differentiation Opportunities:
                    </h3>
                    <Paragraph>
                      {competitor.differentiationOpportunity}
                    </Paragraph>
                  </div>
                </Section>
              ))}

              <Section
                header="Comparison:"
                onReport={() => onReport('competitor_analysis.comparison')}
              >
                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Strengths:
                </h3>
                <SimpleUnorderedList items={data.comparison.strengths} />

                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Weaknesses:
                </h3>
                <SimpleUnorderedList items={data.comparison.weaknesses} />
              </Section>

              <Section
                header="Differentiation Suggestions:"
                onReport={() =>
                  onReport('competitor_analysis.differentiation_suggestions')
                }
              >
                <SimpleUnorderedList items={data.differentiationSuggestions} />
              </Section>
            </>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionCompetitors
