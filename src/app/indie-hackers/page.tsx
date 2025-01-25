import React from 'react'
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

export const dynamic = 'force-dynamic'

const repository = new ConceptRepositorySQLite()

async function getTotalConceptsCount(): Promise<number> {
  return await repository.getTotal()
}

export default async function IndieHackerLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Build What People Actually Want</Heading>

      <Subheading>
        As an indie hacker, you have limited time and resources. CheckMVP helps
        you confirm your idea&apos;s potential before you commit to the grind.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'Rapid Idea Validation with AI-powered analysis',
              'Market Analysis & Competitor Check',
              'Target Audience Insights & Value Proposition',
              'Downloadable PDF Report for Reference',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA
              utmSource="indie_hackers"
              utmCampaign="indiehackers_landing"
            >
              Validate My MVP
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

      <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-4 text-lg text-green-800 md:mb-4 lg:mb-12">
        <p>
          Join <strong>{totalConceptsCount} indie hackers</strong> who&apos;ve
          already validated their ideas with CheckMVP 🚀
        </p>
      </div>

      <Section heading="Why Validate Now?">
        <SectionGridTwoColumns>
          <SectionCell
            heading="Reduce Risk"
            description="Go lean by confirming your concept before writing code. Get real insights about market demand and user needs before investing your precious time."
          />
          <SectionCell
            heading="Save Time & Money"
            description="Skip building dead-end features. Focus on what resonates with real users and avoid wasting resources on unnecessary development."
          />
          <SectionCell
            heading="Stay Motivated"
            description="Early wins keep you energized for the hard parts of indie hacking. Get the confidence you need to push through challenges."
          />
          <SectionCell
            heading="Make Data-Driven Decisions"
            description="Replace guesswork with concrete insights. Use AI-powered analysis to make informed choices about your product direction."
          />
        </SectionGridTwoColumns>
      </Section>

      <RandomMessage />

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA
          utmSource="indie_hackers"
          utmCampaign="indiehackers_landing"
        >
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
        heading="Problem-Solution Fit"
        description="Verify that your solution truly addresses a painful problem worth solving."
      />

      <SectionCell
        heading="Market Opportunity"
        description="Identify gaps in the market and potential revenue streams for your idea."
      />

      <SectionCell
        heading="User Personas"
        description="Get detailed profiles of your ideal customers and their key pain points."
      />

      <SectionCell
        heading="Competitive Edge"
        description="Understand how to position your product against existing solutions."
      />

      <SectionCell
        heading="Growth Channels"
        description="Discover the most effective ways to reach and acquire your first users."
      />

      <SectionCell
        heading="Next Steps"
        description="Get actionable recommendations for moving forward with your MVP."
      />
    </SectionGrid>
  </Section>
)
