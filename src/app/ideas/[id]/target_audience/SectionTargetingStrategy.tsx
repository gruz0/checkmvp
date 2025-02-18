'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionTargetingStrategyProps {
  targetingStrategy: string
}

const SectionTargetingStrategy: React.FC<SectionTargetingStrategyProps> = ({
  targetingStrategy,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="targeting_strategy">
      <SectionHeader
        title="Targeting Strategy"
        emoji="📈"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_targeting_strategy"
      />

      {isExpanded && (
        <div id="section_targeting_strategy">
          <SectionContainer>
            <Paragraph>{targetingStrategy}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionTargetingStrategy
