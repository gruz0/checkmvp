'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionDifferentiationSuggestionsProps {
  differentiationSuggestions: string[]
}

const SectionDifferentiationSuggestions: React.FC<
  SectionDifferentiationSuggestionsProps
> = ({ differentiationSuggestions }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="differentiation_suggestions">
      <SectionHeader
        title="Differentiation Suggestions"
        emoji="📈"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_differentiation_suggestions"
      />

      {isExpanded && (
        <div id="section_differentiation_suggestions">
          <SectionContainer>
            <SimpleUnorderedList items={differentiationSuggestions} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionDifferentiationSuggestions
