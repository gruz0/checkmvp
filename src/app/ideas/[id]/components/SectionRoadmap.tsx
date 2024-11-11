'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionRoadmap = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="roadmap">
      <SectionHeader
        color="text-gray-400"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_roadmap_suggestions"
      >
        Soon: Roadmap Suggestions
      </SectionHeader>

      {isExpanded && (
        <div id="section_roadmap_suggestions">
          <SectionDescription>
            Here, we provide suggestions for creating a roadmap that outlines
            the future direction of your product. It helps you visualize where
            you want to go and what steps are needed to get there.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionRoadmap
