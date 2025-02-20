'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionResourceOptimizationProps {
  resourceOptimization: {
    minimumBudget: string
    timeSavingTips: string[]
    freeTools: string[]
    paidAlternatives: string[]
  }
}

const SectionResourceOptimization: React.FC<
  SectionResourceOptimizationProps
> = ({ resourceOptimization }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="resource_optimization">
      <SectionHeader
        title="Resource Optimization"
        emoji="⚡"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_resource_optimization"
      />

      {isExpanded && (
        <div id="section_resource_optimization">
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold">Minimum Budget:</h3>
            <Paragraph>{resourceOptimization.minimumBudget}</Paragraph>

            <h3 className="mb-2 text-lg font-semibold">Time-Saving Tips:</h3>
            <SimpleUnorderedList items={resourceOptimization.timeSavingTips} />

            <h3 className="mb-2 text-lg font-semibold">Free Tools:</h3>
            <SimpleUnorderedList items={resourceOptimization.freeTools} />

            <h3 className="mb-2 text-lg font-semibold">Paid Alternatives:</h3>
            <SimpleUnorderedList
              items={resourceOptimization.paidAlternatives}
            />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionResourceOptimization
