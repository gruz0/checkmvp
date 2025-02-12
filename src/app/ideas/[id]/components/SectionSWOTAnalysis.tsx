'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionSWOTAnalysisProps {
  data: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  } | null
}

const SectionSWOTAnalysis: React.FC<SectionSWOTAnalysisProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="swot_analysis">
      <SectionHeader
        title="SWOT Analysis"
        emoji="⚖️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_swot_analysis"
      />

      {isExpanded && (
        <div id="section_swot_analysis">
          <SectionDescription>
            SWOT stands for Strengths, Weaknesses, Opportunities, and Threats.
            In this section, we explore these aspects to provide a comprehensive
            view of your product&apos;s position. It&apos;s a helpful exercise
            that can reveal both challenges and potential advantages, guiding
            your strategy moving forward.
          </SectionDescription>

          {data ? (
            <div className="grid grid-cols-1 gap-4 md:gap-4 lg:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-green-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-green-700 md:text-2xl">
                    💪 Strengths
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700 md:text-lg">
                    {data.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-yellow-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-yellow-700 md:text-2xl">
                    ⚠️ Weaknesses
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700 md:text-lg">
                    {data.weaknesses.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-blue-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-blue-700 md:text-2xl">
                    🚀 Opportunities
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700 md:text-lg">
                    {data.opportunities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-red-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-red-700 md:text-2xl">
                    🔥 Threats
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700 md:text-lg">
                    {data.threats.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionSWOTAnalysis
