'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionNetworkingOpportunities = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="networking_opportunities">
      <SectionHeader
        title="Soon: Networking Opportunities"
        emoji="🤝"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_networking_opportunities"
      />

      {isExpanded && (
        <div id="section_networking_opportunities">
          <SectionDescription>
            This section identifies potential networking opportunities that
            could benefit your product journey. Connecting with others can
            provide support, insights, and collaboration possibilities that
            enhance your project.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionNetworkingOpportunities
