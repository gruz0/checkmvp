'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionMainChallengesProps {
  mainChallenges: string[]
}

const SectionMainChallenges: React.FC<SectionMainChallengesProps> = ({
  mainChallenges,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="main_challenges">
      <SectionHeader
        title="Main Challenges"
        emoji="🗻"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_main_challenges"
      />

      {isExpanded && (
        <div id="section_main_challenges">
          <SectionContainer>
            <SimpleUnorderedList items={mainChallenges} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionMainChallenges
