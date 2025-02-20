import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionGoogleTrends from './SectionSuggestedKeywords'

interface Props {
  ideaId: string
  googleTrendsKeywords: Array<string>
}

export const GoogleTrendsReport = ({ ideaId, googleTrendsKeywords }: Props) => (
  <MainContainer ideaId={ideaId} activePath="google_trends" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        📈 Google Trends Keywords
      </h1>
    </div>

    <Paragraph>
      In this section, we look at popular search terms related to your product.
      Understanding which keywords are trending can inform your marketing
      strategy and help you attract the right audience. It&apos;s a practical
      way to connect your idea with what people are already searching for.
    </Paragraph>

    <HorizontalLine />

    <SectionGoogleTrends googleTrendsKeywords={googleTrendsKeywords} />
  </MainContainer>
)
