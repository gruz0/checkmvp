'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionDescriptionProps {
  description: string
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="description">
      <SectionHeader
        title="Description"
        emoji="📈"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_description"
      />

      {isExpanded && (
        <div id="section_description">
          <SectionContainer>
            <Paragraph>{description}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionDescription
