'use client'

import React, { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface Props {
  painPoints: string[]
}

const PainPointsSection: React.FC<Props> = ({ painPoints }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (!painPoints.length) return null

  return (
    <SectionWrapper id="pain_points">
      <SectionHeader
        title="What's Bugging Users?"
        emoji="⚠️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_pain_points"
      />

      {isExpanded && (
        <div id="section_pain_points">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {painPoints.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg dark:border-gray-700 dark:bg-gray-900/50"
              >
                <p className="first-letter:float-left first-letter:pr-3 first-letter:text-5xl first-letter:font-bold">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default PainPointsSection
