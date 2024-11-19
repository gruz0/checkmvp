'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionTwoWeekTestingPlan = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="two_week_testing_plan">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_two_week_testing_plan"
      >
        Soon: Two-Week Testing Plan
      </SectionHeader>

      {isExpanded && (
        <div id="section_two_week_testing_plan">
          <SectionDescription>
            This section outlines a simple plan for testing your product idea
            with real users over two weeks. Getting feedback early can save you
            time and resources later on. It&apos;s about learning quickly and
            adjusting your approach based on what you discover.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionTwoWeekTestingPlan
