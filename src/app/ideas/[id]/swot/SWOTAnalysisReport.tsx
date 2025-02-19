import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
import SectionOpportunities from './SectionOpportunities'
import SectionStrengths from './SectionStrengths'
import SectionThreats from './SectionThreats'
import SectionWeaknesses from './SectionWeaknesses'

interface Props {
  ideaId: string
  swotAnalysis: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
}

export const SWOTAnalysisReport = ({ ideaId, swotAnalysis }: Props) => (
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar ideaId={ideaId} />
      </aside>

      <div className="flex-1 md:pl-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
            📊 SWOT Analysis
          </h1>
        </div>

        <Paragraph>
          SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. In
          this section, we explore these aspects to provide a comprehensive view
          of your product&apos;s position. It&apos;s a helpful exercise that can
          reveal both challenges and potential advantages, guiding your strategy
          moving forward.
        </Paragraph>

        <HorizontalLine />

        <SectionStrengths strengths={swotAnalysis.strengths} />

        <HorizontalLine />

        <SectionWeaknesses weaknesses={swotAnalysis.weaknesses} />

        <HorizontalLine />

        <SectionOpportunities opportunities={swotAnalysis.opportunities} />

        <HorizontalLine />

        <SectionThreats threats={swotAnalysis.threats} />

        <HorizontalLine />
      </div>
    </div>

    <BackToTopButton />
  </div>
)
