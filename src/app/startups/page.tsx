import React from 'react'
import { SystemTimeProvider } from '@/common/domain/TimeProvider'
import AnalyticsBanner from '@/components/AnalyticsBanner'
import {
  CheckList,
  Heading,
  PrimaryCTA,
  SecondaryCTA,
  Section,
  SectionCell,
  SectionGrid,
  SectionGridTwoColumns,
  Subheading,
} from '@/components/LandingPage'
import RandomMessage from '@/components/RandomMessage'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { env } from '@/lib/env'

export const dynamic = 'force-dynamic'

const repository = new ConceptRepositorySQLite(
  new SystemTimeProvider(),
  env.CONCEPT_EXPIRATION_DAYS
)

async function getTotalConceptsCount(): Promise<number> {
  return await repository.getTotal()
}

export default async function StartupLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Set Your Startup on the Right Track, First</Heading>

      <Subheading>
        As a founder, you&apos;ve got plenty on your plate. Let CheckMVP handle
        the early research so you can move forward with confidence.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'AI-Powered Insights for market validation',
              'No-Code Required - validate before building',
              'Target Audience Clarity for better pitching',
              'PDF Reports ready for investor meetings',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA utmSource="startups" utmCampaign="startups_landing">
              Validate My Startup Idea
            </PrimaryCTA>
          </div>
        </div>

        <div className="mt-2 flex w-full justify-center md:mt-0 md:w-1/2">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/3eb8CPBoRmg?si=vNiHvzBbSdoSB_az"
              title="YouTube video player"
              className="absolute left-0 top-0 size-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <AnalyticsBanner totalConceptsCount={totalConceptsCount} />

      <RandomMessage />

      <Section heading="Save Time and Resources">
        <SectionGridTwoColumns>
          <SectionCell
            heading="Validate Before Building"
            description="Skip months of building in the dark. Get clear insights about what your target users actually need before writing a single line of code."
          />
          <SectionCell
            heading="Investor-Ready Analysis"
            description="Generate professional reports that demonstrate your market understanding and strategic thinking to potential investors."
          />
          <SectionCell
            heading="Focus Your Resources"
            description="Know exactly where to allocate your limited time and budget. Build features that matter most to your target users."
          />
          <SectionCell
            heading="Move Faster"
            description="Stop second-guessing your decisions. Get data-backed validation so you can move forward with confidence."
          />
        </SectionGridTwoColumns>
      </Section>

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA utmSource="startups" utmCampaign="startups_landing">
          Start Now
        </SecondaryCTA>
      </div>
    </div>
  )
}

const WhatIsInside = () => (
  <Section heading="What Your Validation Report Includes">
    <SectionGrid>
      <SectionCell
        heading="Market Analysis"
        description="Get a comprehensive view of your market size, trends, and growth potential."
      />

      <SectionCell
        heading="Competitor Landscape"
        description="Understand who you're up against and how to differentiate your solution."
      />

      <SectionCell
        heading="User Personas"
        description="Identify your ideal customers and what drives their purchasing decisions."
      />

      <SectionCell
        heading="Revenue Models"
        description="Explore different monetization strategies that align with your target market."
      />

      <SectionCell
        heading="Growth Strategy"
        description="Get actionable recommendations for early traction and user acquisition."
      />

      <SectionCell
        heading="Risk Assessment"
        description="Identify potential challenges and prepare mitigation strategies early."
      />
    </SectionGrid>
  </Section>
)
