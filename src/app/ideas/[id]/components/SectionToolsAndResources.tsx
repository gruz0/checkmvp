'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionToolsAndResources = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="tools_and_resources">
      <SectionHeader
        title="Soon: Suggested Tools and Resources"
        emoji="🛠️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_suggested_tools_and_resources"
      />

      {isExpanded && (
        <div id="section_suggested_tools_and_resources">
          <SectionDescription>
            In this final section, we list helpful tools and resources that can
            support your product development process. Whether it&apos;s software
            for project management or articles on best practices, these
            resources can make your journey smoother.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionToolsAndResources
