'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionMarketGapsProps {
  marketGaps: string
}

const SectionMarketGaps: React.FC<SectionMarketGapsProps> = ({
  marketGaps,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="market_gaps">
      <SectionHeader
        title="Market Gaps"
        emoji="🎯"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_market_gaps"
      />

      {isExpanded && (
        <div id="section_market_gaps">
          <SectionContainer>
            <SimpleUnorderedList items={marketGaps.split('\n')} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionMarketGaps
