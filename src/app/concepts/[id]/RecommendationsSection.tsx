'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface Props {
  recommendations: string[]
}

const RecommendationsSection: React.FC<Props> = ({ recommendations }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (!recommendations.length) return null

  return (
    <SectionWrapper id="recommendations">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_recommendations"
      >
        <span className="inline-block w-8 md:w-10">💡</span> Refined Problem
        Statements
      </SectionHeader>

      {isExpanded && (
        <div id="section_recommendations">
          <p className="mb-6 text-lg md:text-xl">
            This section provides refined statements that probably are more
            effective and clear. Feel free to click on the button to try
            different versions; it will open a new tab with the pre-filled
            content.
          </p>

          <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6">
            {recommendations.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:border-gray-700 dark:bg-gray-900/50"
              >
                <p className="grow md:text-lg">{item}</p>

                <div className="mt-6">
                  <Link
                    href={{
                      pathname: '/start',
                      query: { problem: item },
                    }}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-[#023840] dark:hover:bg-[#034e59]"
                  >
                    Try This Statement Instead
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default RecommendationsSection
