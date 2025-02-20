'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionUserBehaviorsProps {
  userBehaviors: string
}

const SectionUserBehaviors: React.FC<SectionUserBehaviorsProps> = ({
  userBehaviors,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="user_behaviors">
      <SectionHeader
        title="User Behaviors"
        emoji="👥"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_user_behaviors"
      />

      {isExpanded && (
        <div id="section_user_behaviors">
          <SectionContainer>
            <SimpleUnorderedList items={userBehaviors.split('\n')} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionUserBehaviors
