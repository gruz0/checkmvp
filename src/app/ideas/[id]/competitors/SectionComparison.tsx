'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionComparisonProps {
  comparison: {
    strengths: string[]
    weaknesses: string[]
  }
}

const SectionComparison: React.FC<SectionComparisonProps> = ({
  comparison,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="comparison">
      <SectionHeader
        title="Comparison"
        emoji="⚖️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_comparison"
      />

      {isExpanded && (
        <div id="section_comparison">
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold md:text-xl">
              Strengths:
            </h3>
            <SimpleUnorderedList items={comparison.strengths} />

            <h3 className="mb-2 text-lg font-semibold md:text-xl">
              Weaknesses:
            </h3>
            <SimpleUnorderedList items={comparison.weaknesses} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionComparison
