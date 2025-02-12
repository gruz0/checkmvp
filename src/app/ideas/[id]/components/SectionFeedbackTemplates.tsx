'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionFeedbackTemplates = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="feedback_templates">
      <SectionHeader
        title="Soon: Initial Feedback Templates"
        emoji="📝"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_initial_feedback_templates"
      />

      {isExpanded && (
        <div id="section_initial_feedback_templates">
          <SectionDescription>
            In this part, we offer templates for gathering feedback from users
            about your product. Having ready-made questions can streamline the
            process and ensure you get useful insights that guide your next
            steps.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionFeedbackTemplates
