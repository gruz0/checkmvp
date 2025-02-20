'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionWeaknessesProps {
  weaknesses: string[]
}

const SectionWeaknesses: React.FC<SectionWeaknessesProps> = ({
  weaknesses,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="weaknesses">
      <SectionHeader
        title="Weaknesses"
        emoji="⚠️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_weaknesses"
      />

      {isExpanded && (
        <div id="section_weaknesses">
          <SectionContainer>
            <SimpleUnorderedList items={weaknesses} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionWeaknesses
