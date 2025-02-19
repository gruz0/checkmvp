'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionTestingMethodsProps {
  testingMethods: Array<{
    method: string
    description: string
    whenToUse: string
    expectedOutcome: string
  }>
}

const SectionTestingMethods: React.FC<SectionTestingMethodsProps> = ({
  testingMethods,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="testing_methods">
      <SectionHeader
        title="Testing Methods"
        emoji="🔬"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_testing_methods"
      />

      {isExpanded && (
        <div id="section_testing_methods">
          {testingMethods.map((method, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                {idx + 1}. {method.method}
              </h3>

              <SectionContainer>
                <Paragraph>{method.description}</Paragraph>

                <h3 className="mb-2 text-lg font-semibold">When to Use:</h3>
                <Paragraph>{method.whenToUse}</Paragraph>

                <h3 className="mb-2 text-lg font-semibold">
                  Expected Outcome:
                </h3>
                <Paragraph>{method.expectedOutcome}</Paragraph>
              </SectionContainer>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionTestingMethods
