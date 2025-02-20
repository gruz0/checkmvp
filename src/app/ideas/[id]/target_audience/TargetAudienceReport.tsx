import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionPainPoints from './SectionPainPoints'
import SectionTargetingStrategy from './SectionTargetingStrategy'
import SectionWhy from './SectionWhy'

interface Props {
  ideaId: string
  targetAudience: {
    id: string
    segment: string
    description: string
    why: string
    painPoints: string[]
    targetingStrategy: string
  }
}

export const TargetAudienceReport = ({ ideaId, targetAudience }: Props) => (
  <MainContainer ideaId={ideaId} activePath="target_audience" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        🎯 {targetAudience.segment}
      </h1>
    </div>

    <Paragraph>{targetAudience.description}</Paragraph>

    <HorizontalLine />

    <SectionWhy why={targetAudience.why} />

    <HorizontalLine />

    <SectionPainPoints painPoints={targetAudience.painPoints} />

    <HorizontalLine />

    <SectionTargetingStrategy
      targetingStrategy={targetAudience.targetingStrategy}
    />

    <HorizontalLine />
  </MainContainer>
)
