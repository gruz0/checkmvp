'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionStrengthsProps {
  strengths: string[]
}

const SectionStrengths: React.FC<SectionStrengthsProps> = ({ strengths }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="strengths">
      <SectionHeader
        title="Strengths"
        emoji="💪"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_strengths"
      />

      {isExpanded && (
        <div id="section_strengths">
          <SectionContainer>
            <SimpleUnorderedList items={strengths} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionStrengths
