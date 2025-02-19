import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
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
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar ideaId={ideaId} />
      </aside>

      <div className="flex-1 md:pl-8">
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
      </div>
    </div>

    <BackToTopButton />
  </div>
)
