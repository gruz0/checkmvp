'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionEarlyAdopters = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="early_adopters">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_early_adopters_acquisition_ideas"
      >
        Soon: Early Adopters Acquisition Ideas
      </SectionHeader>

      {isExpanded && (
        <div id="section_early_adopters_acquisition_ideas">
          <SectionDescription>
            Here, we suggest ways to attract early adopters who can provide
            valuable feedback and help you refine your product. Engaging early
            users can build momentum and create a community around your idea.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionEarlyAdopters
