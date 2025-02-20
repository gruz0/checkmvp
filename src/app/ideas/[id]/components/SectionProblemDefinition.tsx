'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionProblemDefinitionProps {
  problemDefinition: string
}

const SectionProblemDefinition: React.FC<SectionProblemDefinitionProps> = ({
  problemDefinition,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="problem_definition">
      <SectionHeader
        title="Problem Definition"
        emoji="📝"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_problem_definition"
      />

      {isExpanded && (
        <div id="section_problem_definition">
          <SectionContainer>
            <Paragraph>{problemDefinition.split('\n')}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionProblemDefinition
