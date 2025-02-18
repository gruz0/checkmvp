'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionHowToPitchProps {
  mainBenefit: string
  problemSolving: string
}

const SectionHowToPitch: React.FC<SectionHowToPitchProps> = ({
  mainBenefit,
  problemSolving,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="how_to_pitch">
      <SectionHeader
        title="How to Pitch Your Idea or Start a Conversation"
        emoji="📈"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_how_to_pitch"
      />

      {isExpanded && (
        <div id="section_how_to_pitch">
          <SectionContainer>
            <Paragraph>{mainBenefit}</Paragraph>

            <Paragraph>{problemSolving}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionHowToPitch
