'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionExistingSolutionsProps {
  existingSolutions: string[]
}

const SectionExistingSolutions: React.FC<SectionExistingSolutionsProps> = ({
  existingSolutions,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="existing_solutions">
      <SectionHeader
        title="Existing Solutions"
        emoji="🛠️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_existing_solutions"
      />

      {isExpanded && (
        <div id="section_existing_solutions">
          <SectionContainer>
            <SimpleUnorderedList items={existingSolutions} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionExistingSolutions
