'use client'

import React, { useState } from 'react'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionTrendsProps {
  trends: string
}

const SectionTrends: React.FC<SectionTrendsProps> = ({ trends }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="trends">
      <SectionHeader
        title="Trends"
        emoji="📈"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_trends"
      />

      {isExpanded && (
        <div id="section_trends">
          <SectionContainer>
            <SimpleUnorderedList items={trends.split('\n')} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionTrends
