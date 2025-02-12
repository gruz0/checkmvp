'use client'

import React, { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface Props {
  suggestions: string[]
}

const SharpenIdeaSection: React.FC<Props> = ({ suggestions }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (!suggestions.length) return null

  return (
    <SectionWrapper id="sharpen_idea">
      <SectionHeader
        title="How to Improve It"
        emoji="✍️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_sharpen_idea"
      />

      {isExpanded && (
        <div id="section_sharpen_idea">
          <p className="mb-6 md:text-lg lg:text-xl">
            This section provides suggestions for improving the clarity and
            effectiveness of your assumptions.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {suggestions.map((item, index) => (
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

export default SharpenIdeaSection
