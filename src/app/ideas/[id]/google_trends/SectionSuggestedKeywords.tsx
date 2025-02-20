'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionGoogleTrendsProps {
  googleTrendsKeywords: string[]
}

const SectionGoogleTrends: React.FC<SectionGoogleTrendsProps> = ({
  googleTrendsKeywords,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="google_trends">
      <SectionHeader
        title="Suggested Keywords to Analyze"
        emoji="🔍"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_google_trends"
      />

      {isExpanded && (
        <div id="section_google_trends">
          <SectionContainer>
            <Paragraph>
              These AI-suggested keywords are a starting point for exploring
              market trends. Click any keyword to view its popularity on Google
              Trends in a new tab. We recommend checking different time periods
              like 1 week and 90 days. Be sure to conduct your own research as
              well.
            </Paragraph>

            <div className="mb-4 flex flex-wrap gap-2 lg:mb-6">
              {googleTrendsKeywords.map((keyword) => (
                <Link
                  href={`https://trends.google.com/trends/explore?date=today%201-m&q=${keyword}&hl=en`}
                  key={keyword}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 shadow transition-all duration-200 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionGoogleTrends
