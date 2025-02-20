'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionTargetUsersProps {
  targetUsers: string
  whyItMatters: string
}

const SectionTargetUsers: React.FC<SectionTargetUsersProps> = ({
  targetUsers,
  whyItMatters,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="target_users">
      <SectionHeader
        title="Target Users & Why It Matters"
        emoji="👥"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_target_users"
      />

      {isExpanded && (
        <div id="section_target_users">
          <SectionContainer>
            <Paragraph>{targetUsers.split('\n')}</Paragraph>
            <Paragraph>{whyItMatters.split('\n')}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionTargetUsers
