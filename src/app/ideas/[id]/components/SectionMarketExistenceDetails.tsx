'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionMarketExistenceDetailsProps {
  marketExistenceDetails: string[]
}

const SectionMarketExistenceDetails: React.FC<
  SectionMarketExistenceDetailsProps
> = ({ marketExistenceDetails }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="market_existence_details">
      <SectionHeader
        title="Market Existence Details"
        emoji="🌍"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_market_existence_details"
      />

      {isExpanded && (
        <div id="section_market_existence_details">
          <SectionContainer>
            <SimpleUnorderedList items={marketExistenceDetails} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionMarketExistenceDetails
