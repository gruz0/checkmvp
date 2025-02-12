'use client'

import React, { useState } from 'react'

import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'
import { TargetAudience } from './types'

interface Props {
  targetAudience: TargetAudience[]
}

const TargetAudienceSection = ({ targetAudience }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (targetAudience.length === 0) return null

  return (
    <SectionWrapper id="target_audience">
      <SectionHeader
        title="Who's This Really For?"
        emoji="👥"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_target_audience"
      />

      {isExpanded && (
        <div id="section_target_audience">
          <p className="mb-6 md:text-lg lg:text-xl">
            Sometimes we might be too focused on the problem itself that we
            forget about the people who are affected by it. This section helps
            identify potential target audiences for the given assumption or
            hypothesis. You will be able to choose the most relevant audience
            for your idea on the next step.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {targetAudience.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 md:p-6 md:pb-0 dark:bg-gray-900/50"
              >
                <p className="mb-4 text-lg font-bold md:text-xl">
                  {item.segment}
                </p>

                <p className="mb-4 md:text-lg">{item.description}</p>

                <p className="mb-4 font-semibold md:text-lg">
                  Their Challenges:
                </p>

                <SimpleUnorderedList items={item.challenges} />

                <div>
                  <p className="mb-4 font-semibold md:text-lg">
                    Market Validation Metrics:
                  </p>

                  <div className="mb-4 rounded-md bg-white p-4 dark:bg-gray-800">
                    <p className="text-gray-700 md:text-lg dark:text-gray-100">
                      Market Size
                    </p>
                    <p className="mt-1 font-medium">
                      {item.validationMetrics.marketSize}
                    </p>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
                      <div>
                        <p className="text-gray-700 md:text-lg dark:text-gray-100">
                          Accessibility
                        </p>
                        <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-400">
                          How easy to reach
                        </p>
                      </div>
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.validationMetrics.accessibility}
                        <span className="text-sm text-gray-400">/10</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
                      <div>
                        <p className="text-gray-700 md:text-lg dark:text-gray-100">
                          Pain Point
                        </p>
                        <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-400">
                          Problem severity
                        </p>
                      </div>
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.validationMetrics.painPointIntensity}
                        <span className="text-sm text-gray-400">/10</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
                      <div>
                        <p className="text-gray-700 md:text-lg dark:text-gray-100">
                          Pay Intent
                        </p>
                        <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-400">
                          Willingness to pay
                        </p>
                      </div>
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.validationMetrics.willingnessToPay}
                        <span className="text-sm text-gray-400">/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default TargetAudienceSection
