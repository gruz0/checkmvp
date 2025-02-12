'use client'

import React, { useState } from 'react'

import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface AssumptionsAnalysis {
  coreAssumptions: string[]
  testability: number
  riskLevel: string
  validationMethods: string[]
}

interface Props {
  assumptionsAnalysis: AssumptionsAnalysis | null
}

const AssumptionsAnalysisSection: React.FC<Props> = ({
  assumptionsAnalysis,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (!assumptionsAnalysis) return null

  return (
    <SectionWrapper id="assumptions_analysis">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_assumptions_analysis"
      >
        <span className="inline-block w-8 md:w-10">🎯</span> Assumptions
        Analysis
      </SectionHeader>

      {isExpanded && (
        <div id="section_assumptions_analysis">
          <div className="space-y-6">
            <p className="mb-6 md:text-lg lg:text-xl">
              This analysis helps identify and validate key beliefs about your
              idea before investing resources. By breaking down core
              assumptions, measuring their testability, and assessing risk
              levels, you can prioritize which aspects of your idea need
              validation first.
            </p>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Core Assumptions
              </h3>

              <SimpleUnorderedList
                items={assumptionsAnalysis.coreAssumptions}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:bg-gray-900/50">
                <span className="text-lg font-semibold">Risk Level:</span>
                <span className="text-lg">{assumptionsAnalysis.riskLevel}</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:bg-gray-900/50">
                <span className="text-lg font-semibold">
                  Testability Score:
                </span>
                <span className="text-lg">
                  {assumptionsAnalysis.testability}/10
                </span>
              </div>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Validation Methods
              </h3>

              <SimpleUnorderedList
                items={assumptionsAnalysis.validationMethods}
              />
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default AssumptionsAnalysisSection
