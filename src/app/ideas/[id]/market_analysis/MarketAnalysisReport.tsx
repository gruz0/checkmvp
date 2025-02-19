import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
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
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar ideaId={ideaId} />
      </aside>

      <div className="flex-1 md:pl-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
            📊 Market Analysis Overview
          </h1>
        </div>

        <Paragraph>
          Here, we take a closer look at the overall market landscape related to
          your idea. This overview helps you understand who your potential
          customers are, what trends are emerging, and how your product can fit
          into the market. It&apos;s important to know where your idea stands
          and what opportunities are out there.
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
      </div>
    </div>

    <BackToTopButton />
  </div>
)
