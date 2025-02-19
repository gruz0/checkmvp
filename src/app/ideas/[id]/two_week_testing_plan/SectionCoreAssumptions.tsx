'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionCoreAssumptionsProps {
  coreAssumptions: Array<{
    assumption: string
    whyCritical: string
    validationMethod: string
  }>
}

const SectionCoreAssumptions: React.FC<SectionCoreAssumptionsProps> = ({
  coreAssumptions,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="core_assumptions">
      <SectionHeader
        title="Core Assumptions"
        emoji="🤔"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_core_assumptions"
      />

      {isExpanded && (
        <div id="section_core_assumptions">
          {coreAssumptions.map((assumption, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                {idx + 1}. {assumption.assumption}
              </h3>
              <SectionContainer>
                <h3 className="mb-2 text-lg font-semibold">Why Critical:</h3>
                <Paragraph>{assumption.whyCritical}</Paragraph>

                <h3 className="mb-2 text-lg font-semibold">
                  Validation Method:
                </h3>
                <Paragraph>{assumption.validationMethod}</Paragraph>
              </SectionContainer>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionCoreAssumptions
