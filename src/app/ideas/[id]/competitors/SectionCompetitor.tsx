'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionCompetitorProps {
  position: number
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

const numberEmojis = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
}

const SectionCompetitor: React.FC<SectionCompetitorProps> = ({
  position,
  competitor,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id={`competitor_${position}`}>
      <SectionHeader
        title={competitor.name}
        emoji={numberEmojis[position as keyof typeof numberEmojis] || '📈'}
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId={`section_competitor_${position}`}
      />

      {isExpanded && (
        <div id={`section_competitor_${position}`}>
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Product:</h3>
            <Paragraph>
              <a
                href={`${competitor.url}?ref=checkmvp.com`}
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
