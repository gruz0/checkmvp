'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionSWOTAnalysisProps {
  onReport: (section: string) => void
  data: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  } | null
}

const SectionSWOTAnalysis: React.FC<SectionSWOTAnalysisProps> = ({
  onReport,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="swot_analysis">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_swot_analysis"
      >
        SWOT Analysis
      </SectionHeader>

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-green-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-green-700 md:text-2xl">
                    💪 Strengths
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700">
                    {data.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onReport('swot_analysis.strengths')}
                    aria-label="Dislike"
                    className="mt-4 flex items-center self-end rounded bg-gray-100 px-2 py-1 text-sm text-gray-600 hover:bg-red-100"
                  >
                    Dislike
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-yellow-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-yellow-700 md:text-2xl">
                    ⚠️ Weaknesses
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700">
                    {data.weaknesses.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onReport('swot_analysis.weaknesses')}
                    aria-label="Dislike"
                    className="mt-4 flex items-center self-end rounded bg-gray-100 px-2 py-1 text-sm text-gray-600 hover:bg-red-100"
                  >
                    Dislike
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-blue-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-blue-700 md:text-2xl">
                    🚀 Opportunities
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700">
                    {data.opportunities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onReport('swot_analysis.opportunities')}
                    aria-label="Dislike"
                    className="mt-4 flex items-center self-end rounded bg-gray-100 px-2 py-1 text-sm text-gray-600 hover:bg-red-100"
                  >
                    Dislike
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-1 flex-col rounded-lg bg-red-50 p-4 shadow transition-shadow duration-200 hover:shadow-lg md:p-6">
                  <h3 className="mb-4 flex items-center text-xl font-semibold text-red-700 md:text-2xl">
                    🔥 Threats
                  </h3>

                  <ul className="flex-1 list-inside list-disc space-y-2 text-gray-700">
                    {data.threats.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onReport('swot_analysis.threats')}
                    aria-label="Dislike"
                    className="mt-4 flex items-center self-end rounded bg-gray-100 px-2 py-1 text-sm text-gray-600 hover:bg-red-100"
                  >
                    Dislike
                  </button>
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
