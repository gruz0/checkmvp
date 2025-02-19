'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionDifferentiationProps {
  differentiation: string
}

const SectionDifferentiation: React.FC<SectionDifferentiationProps> = ({
  differentiation,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="differentiation">
      <SectionHeader
        title="Differentiation"
        emoji="💫"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_differentiation"
      />

      {isExpanded && (
        <div id="section_differentiation">
          <SectionContainer>
            <Paragraph>{differentiation}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionDifferentiation
