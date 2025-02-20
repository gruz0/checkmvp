import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
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
  <MainContainer ideaId={ideaId} activePath="swot" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        📊 SWOT Analysis
      </h1>
    </div>

    <Paragraph>
      SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. In this
      section, we explore these aspects to provide a comprehensive view of your
      product&apos;s position. It&apos;s a helpful exercise that can reveal both
      challenges and potential advantages, guiding your strategy moving forward.
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
  </MainContainer>
)
