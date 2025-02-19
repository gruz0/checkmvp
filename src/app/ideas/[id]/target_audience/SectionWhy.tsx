'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionWhyProps {
  why: string
}

const SectionWhy: React.FC<SectionWhyProps> = ({ why }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="why">
      <SectionHeader
        title="Why"
        emoji="🤔"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_why"
      />

      {isExpanded && (
        <div id="section_why">
          <SectionContainer>
            <Paragraph>{why}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionWhy
