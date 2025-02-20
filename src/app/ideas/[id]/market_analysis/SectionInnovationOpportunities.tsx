'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionInnovationOpportunitiesProps {
  innovationOpportunities: string
}

const SectionInnovationOpportunities: React.FC<
  SectionInnovationOpportunitiesProps
> = ({ innovationOpportunities }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="innovation_opportunities">
      <SectionHeader
        title="Innovation Opportunities"
        emoji="💡"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_innovation_opportunities"
      />

      {isExpanded && (
        <div id="section_innovation_opportunities">
          <SectionContainer>
            <SimpleUnorderedList items={innovationOpportunities.split('\n')} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionInnovationOpportunities
