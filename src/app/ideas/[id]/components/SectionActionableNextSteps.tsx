'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionActionableNextSteps = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="actionable_next_steps">
      <SectionHeader
        color="text-gray-400"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_actionable_next_steps"
      >
        Soon: Actionable Next Steps
      </SectionHeader>

      {isExpanded && (
        <div id="section_actionable_next_steps">
          <SectionDescription>
            Here, we lay out clear steps for what to do next. This section is
            crucial because it helps you take your analysis and turn it into
            action, ensuring you stay on track and make progress with your idea.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionActionableNextSteps
