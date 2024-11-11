'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionContentIdeas = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="content_ideas">
      <SectionHeader
        color="text-gray-400"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_content_ideas_for_marketing"
      >
        Soon: Content Ideas For Marketing
      </SectionHeader>

      {isExpanded && (
        <div id="section_content_ideas_for_marketing">
          <SectionDescription>
            This section provides you with fresh ideas for marketing content
            that resonates with your target audience. From blog posts to social
            media updates, having a content plan helps you engage potential
            users and create buzz around your product.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionContentIdeas
