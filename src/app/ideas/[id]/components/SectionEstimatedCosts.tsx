'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionEstimatedCosts = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="estimated_costs">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_estimated_costs_and_timeline"
      >
        Soon: Estimated Costs and Timeline for MVP Launch
      </SectionHeader>

      {isExpanded && (
        <div id="section_estimated_costs_and_timeline">
          <SectionDescription>
            In this section, we provide an overview of what it might cost to
            bring your minimum viable product (MVP) to life and how long it
            could take. Knowing the budget and timeline helps you plan
            effectively and manage expectations as you move forward.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionEstimatedCosts
