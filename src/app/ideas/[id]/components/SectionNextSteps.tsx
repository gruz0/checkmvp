'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionNextStepsProps {
  nextSteps: string[]
}

const SectionNextSteps: React.FC<SectionNextStepsProps> = ({ nextSteps }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="next_steps">
      <SectionHeader
        title="Next Steps"
        emoji="👣"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_next_steps"
      />

      {isExpanded && (
        <div id="section_next_steps">
          <SectionContainer>
            <SimpleUnorderedList items={nextSteps} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionNextSteps
