'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionPainPointsProps {
  painPoints: string[]
}

const SectionPainPoints: React.FC<SectionPainPointsProps> = ({
  painPoints,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="pain_points">
      <SectionHeader
        title="Pain Points"
        emoji="😣"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_pain_points"
      />

      {isExpanded && (
        <div id="section_pain_points">
          <SectionContainer>
            <SimpleUnorderedList items={painPoints} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionPainPoints
