'use client'

import React, { useState } from 'react'

import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface HypothesisFramework {
  format: string
  examples: string[]
}

interface Props {
  hypothesisFramework: HypothesisFramework | null
}

const HypothesisFrameworkSection: React.FC<Props> = ({
  hypothesisFramework,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (!hypothesisFramework) return null

  return (
    <SectionWrapper id="hypothesis_framework">
      <SectionHeader
        title="Key Assumptions to Test"
        emoji="🧪"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_hypothesis_framework"
      />

      {isExpanded && (
        <div id="section_hypothesis_framework">
          <div className="space-y-6">
            <p className="mb-6 md:text-lg lg:text-xl">
              This section transforms your assumptions into testable statements.
              Each hypothesis follows a structured format that clearly states
              what you believe, why you believe it, and how it can be tested.
              This approach ensures your validation efforts are focused and
              measurable.
            </p>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Your Primary Assumption:
              </h3>

              <p className="md:text-lg">{hypothesisFramework.format}</p>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Hypotheses to Test:
              </h3>

              <div className="space-y-4">
                {hypothesisFramework.examples.map((example, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-gray-100 p-4 dark:bg-gray-800"
                  >
                    <p className="md:text-lg">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default HypothesisFrameworkSection
