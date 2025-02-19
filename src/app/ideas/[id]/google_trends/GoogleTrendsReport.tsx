import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
import SectionGoogleTrends from './SectionSuggestedKeywords'

interface Props {
  ideaId: string
  googleTrendsKeywords: Array<string>
}

export const GoogleTrendsReport = ({ ideaId, googleTrendsKeywords }: Props) => (
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar ideaId={ideaId} />
      </aside>

      <div className="flex-1 md:pl-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
            📈 Google Trends Keywords
          </h1>
        </div>

        <Paragraph>
          In this section, we look at popular search terms related to your
          product. Understanding which keywords are trending can inform your
          marketing strategy and help you attract the right audience. It&apos;s
          a practical way to connect your idea with what people are already
          searching for.
        </Paragraph>

        <HorizontalLine />

        <SectionGoogleTrends googleTrendsKeywords={googleTrendsKeywords} />
      </div>
    </div>

    <BackToTopButton />
  </div>
)
