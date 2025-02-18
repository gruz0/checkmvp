'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionCompetitorProps {
  id: string
  competitor: {
    name: string
    productName: string
    url: string
    coreFeatures: string[]
    valueProposition: string
    userAcquisition: string
    strengths: string[]
    weaknesses: string[]
    differentiationOpportunity: string
  }
}

const SectionCompetitor: React.FC<SectionCompetitorProps> = ({
  id,
  competitor,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id={`competitor_${id}`}>
      <SectionHeader
        title={competitor.name}
        emoji="📈"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId={`section_competitor_${id}`}
      />

      {isExpanded && (
        <div id={`section_competitor_${id}`}>
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Product:</h3>
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
            <Paragraph>{competitor.differentiationOpportunity}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionCompetitor
