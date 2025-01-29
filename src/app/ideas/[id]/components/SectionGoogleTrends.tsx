'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionGoogleTrendsProps {
  data: Array<string> | null
}

const SectionGoogleTrends: React.FC<SectionGoogleTrendsProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="google_trends">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_google_trends_keywords"
      >
        📈 Google Trends Keywords
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
            <Section header="Suggested Keywords to Analyze:">
              <SectionContainer>
                <Paragraph>
                  These AI-suggested keywords are a starting point for exploring
                  market trends. Click any keyword to view its popularity on
                  Google Trends in a new tab. We recommend checking different
                  time periods like 1 week and 90 days. Be sure to conduct your
                  own research as well.
                </Paragraph>

                <div className="mb-4 flex flex-wrap gap-2 lg:mb-6">
                  {data.map((keyword) => (
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
