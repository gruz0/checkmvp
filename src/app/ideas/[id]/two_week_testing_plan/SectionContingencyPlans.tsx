'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionContingencyPlansProps {
  contingencyPlans: Array<{
    scenario: string
    solution: string
    alternativeApproach: string
  }>
}

const SectionContingencyPlans: React.FC<SectionContingencyPlansProps> = ({
  contingencyPlans,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="contingency_plans">
      <SectionHeader
        title="Contingency Plans"
        emoji="🔄"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_contingency_plans"
      />

      {isExpanded && (
        <div id="section_contingency_plans">
          {contingencyPlans.map((plan, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                {idx + 1}. {plan.scenario}
              </h3>

              <SectionContainer>
                <h3 className="mb-2 text-lg font-semibold">Solution:</h3>
                <Paragraph>{plan.solution}</Paragraph>

                <h3 className="mb-2 text-lg font-semibold">
                  Alternative Approach:
                </h3>
                <Paragraph>{plan.alternativeApproach}</Paragraph>
              </SectionContainer>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionContingencyPlans
