'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionThreatsProps {
  threats: string[]
}

const SectionThreats: React.FC<SectionThreatsProps> = ({ threats }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="threats">
      <SectionHeader
        title="Threats"
        emoji="👿"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_threats"
      />

      {isExpanded && (
        <div id="section_threats">
          <SectionContainer>
            <SimpleUnorderedList items={threats} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionThreats
