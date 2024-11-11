'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionGoogleTrendsProps {
  onReport: (section: string) => void
  data: Array<string> | null
}

const SectionGoogleTrends: React.FC<SectionGoogleTrendsProps> = ({
  onReport,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="google_trends">
      <SectionHeader
        color="text-blue-600"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_google_trends_keywords"
      >
        Google Trends Keywords
      </SectionHeader>

      {isExpanded && (
        <div id="section_google_trends_keywords">
          <SectionDescription>
            In this section, we look at popular search terms related to your
            product. Understanding which keywords are trending can inform your
            marketing strategy and help you attract the right audience.
            It&apos;s a practical way to connect your idea with what people are
            already searching for.
          </SectionDescription>

          {data !== null ? (
            <Section
              header="Suggested Keywords to Analyze:"
              onReport={() => onReport('google_trends_keywords')}
            >
              <div className="flex flex-wrap gap-2">
                {data.map((keyword) => (
                  <Link
                    href={`https://trends.google.com/trends/explore?date=today%203-m&q=${keyword}&hl=en`}
                    key={keyword}
                    className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 shadow transition-all duration-200 hover:bg-gray-200"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {keyword}
                  </Link>
                ))}
              </div>
            </Section>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionGoogleTrends
