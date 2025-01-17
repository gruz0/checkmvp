'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionMarketAnalysisProps {
  data: {
    trends: string
    userBehaviors: string
    marketGaps: string
    innovationOpportunities: string
    strategicDirection: string
  } | null
}

const SectionMarketAnalysis: React.FC<SectionMarketAnalysisProps> = ({
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="market_analysis">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_market_analysis_overview"
      >
        Market Analysis Overview
      </SectionHeader>

      {isExpanded && (
        <div id="section_market_analysis_overview">
          <SectionDescription>
            Here, we take a closer look at the overall market landscape related
            to your idea. This overview helps you understand who your potential
            customers are, what trends are emerging, and how your product can
            fit into the market. It&apos;s important to know where your idea
            stands and what opportunities are out there.
          </SectionDescription>

          {data ? (
            <>
              <Section header="Trends:">
                <Paragraph>{data.trends}</Paragraph>
              </Section>

              <Section header="User Behaviors:">
                <Paragraph>{data.userBehaviors}</Paragraph>
              </Section>

              <Section header="Market Gaps:">
                <Paragraph>{data.marketGaps}</Paragraph>
              </Section>

              <Section header="Innovation Opportunities:">
                <Paragraph>{data.innovationOpportunities}</Paragraph>
              </Section>

              <Section header="Strategic Direction:">
                <Paragraph>{data.strategicDirection}</Paragraph>
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

export default SectionMarketAnalysis
