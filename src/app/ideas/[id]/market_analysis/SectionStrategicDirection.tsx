'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionStrategicDirectionProps {
  strategicDirection: string
}

const SectionStrategicDirection: React.FC<SectionStrategicDirectionProps> = ({
  strategicDirection,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="strategic_direction">
      <SectionHeader
        title="Strategic Direction"
        emoji="🎮"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_strategic_direction"
      />

      {isExpanded && (
        <div id="section_strategic_direction">
          <SectionContainer>
            <SimpleUnorderedList items={strategicDirection.split('\n')} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionStrategicDirection
