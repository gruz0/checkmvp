'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

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
        color="text-blue-600"
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
            <>
              <Section
                header="Strengths:"
                onReport={() => onReport('swot_analysis.strengths')}
              >
                <SimpleUnorderedList items={data.strengths} />
              </Section>

              <Section
                header="Weaknesses:"
                onReport={() => onReport('swot_analysis.weaknesses')}
              >
                <SimpleUnorderedList items={data.weaknesses} />
              </Section>

              <Section
                header="Opportunities:"
                onReport={() => onReport('swot_analysis.opportunities')}
              >
                <SimpleUnorderedList items={data.opportunities} />
              </Section>

              <Section
                header="Threats:"
                onReport={() => onReport('swot_analysis.threats')}
              >
                <SimpleUnorderedList items={data.threats} />
              </Section>
            </>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionSWOTAnalysis
