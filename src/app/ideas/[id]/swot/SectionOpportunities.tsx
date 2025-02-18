'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionOpportunitiesProps {
  opportunities: string[]
}

const SectionOpportunities: React.FC<SectionOpportunitiesProps> = ({
  opportunities,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="opportunities">
      <SectionHeader
        title="Opportunities"
        emoji="🚀"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_opportunities"
      />

      {isExpanded && (
        <div id="section_opportunities">
          <SectionContainer>
            <SimpleUnorderedList items={opportunities} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionOpportunities
