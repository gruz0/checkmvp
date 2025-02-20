import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionInnovationOpportunities from './SectionInnovationOpportunities'
import SectionMarketGaps from './SectionMarketGaps'
import SectionStrategicDirection from './SectionStrategicDirection'
import SectionTrends from './SectionTrends'
import SectionUserBehaviors from './SectionUserBehaviors'

interface Props {
  ideaId: string
  marketAnalysis: {
    trends: string
    userBehaviors: string
    marketGaps: string
    innovationOpportunities: string
    strategicDirection: string
  }
}

export const MarketAnalysisReport = ({ ideaId, marketAnalysis }: Props) => (
  <MainContainer ideaId={ideaId} activePath="market_analysis" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        📊 Market Analysis Overview
      </h1>
    </div>

    <Paragraph>
      Here, we take a closer look at the overall market landscape related to
      your idea. This overview helps you understand who your potential customers
      are, what trends are emerging, and how your product can fit into the
      market. It&apos;s important to know where your idea stands and what
      opportunities are out there.
    </Paragraph>

    <HorizontalLine />

    <SectionTrends trends={marketAnalysis.trends} />

    <HorizontalLine />

    <SectionUserBehaviors userBehaviors={marketAnalysis.userBehaviors} />

    <HorizontalLine />

    <SectionMarketGaps marketGaps={marketAnalysis.marketGaps} />

    <HorizontalLine />

    <SectionInnovationOpportunities
      innovationOpportunities={marketAnalysis.innovationOpportunities}
    />

    <HorizontalLine />

    <SectionStrategicDirection
      strategicDirection={marketAnalysis.strategicDirection}
    />

    <HorizontalLine />
  </MainContainer>
)
