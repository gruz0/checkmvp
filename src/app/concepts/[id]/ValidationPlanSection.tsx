'use client'

import React, { useState } from 'react'

import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface ValidationPlan {
  quickWins: string[]
  mediumEffort: string[]
  deepDive: string[]
  successCriteria: string[]
}

interface Props {
  validationPlan: ValidationPlan | null
}

const ValidationPlanSection: React.FC<Props> = ({ validationPlan }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (!validationPlan) return null

  return (
    <SectionWrapper id="validation_plan">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_validation_plan"
      >
        <span className="inline-block w-8 md:w-10">📋</span> Validation Plan
      </SectionHeader>

      {isExpanded && (
        <div id="section_validation_plan">
          <div className="space-y-6">
            <p className="mb-6 md:text-lg lg:text-xl">
              This plan provides a structured approach to testing your
              assumptions, from quick experiments to deeper research. By
              organizing validation tasks by effort level and defining clear
              success criteria, you can efficiently validate your idea with
              minimal resource investment.
            </p>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Quick Wins (1-2 days)
              </h3>

              <SimpleUnorderedList items={validationPlan.quickWins} />
            </div>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Medium Effort Tasks (1-2 weeks)
              </h3>

              <SimpleUnorderedList items={validationPlan.mediumEffort} />
            </div>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Deep Dive Research (1+ months)
              </h3>

              <SimpleUnorderedList items={validationPlan.deepDive} />
            </div>

            <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:bg-gray-900/50">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Specific Metrics to Determine if Assumption is Valid
              </h3>

              <SimpleUnorderedList items={validationPlan.successCriteria} />
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default ValidationPlanSection
