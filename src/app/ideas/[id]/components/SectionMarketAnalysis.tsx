'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

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
        title="Market Analysis Overview"
        emoji="📊"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_market_analysis_overview"
      />

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
                <SectionContainer>
                  <SimpleUnorderedList items={data.trends.split('\n')} />
                </SectionContainer>
              </Section>

              <Section header="User Behaviors:">
                <SectionContainer>
                  <SimpleUnorderedList items={data.userBehaviors.split('\n')} />
                </SectionContainer>
              </Section>

              <Section header="Market Gaps:">
                <SectionContainer>
                  <SimpleUnorderedList items={data.marketGaps.split('\n')} />
                </SectionContainer>
              </Section>

              <Section header="Innovation Opportunities:">
                <SectionContainer>
                  <SimpleUnorderedList
                    items={data.innovationOpportunities.split('\n')}
                  />
                </SectionContainer>
              </Section>

              <Section header="Strategic Direction:">
                <SectionContainer>
                  <SimpleUnorderedList
                    items={data.strategicDirection.split('\n')}
                  />
                </SectionContainer>
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
