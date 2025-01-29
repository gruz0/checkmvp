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

export default async function FreelancerLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Win More Projects with Data-Backed Proposals</Heading>

      <Subheading>
        Clients want freelancers who understand their idea. CheckMVP lets you
        quickly validate project concepts so your bid stands out.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'Instant Insights: AI-powered market analysis',
              'Professional Reports: Polished PDF deliverables',
              'Strong Value Proposition: Data-backed approach',
              'Edge Over Competition: Real insights, not guesswork',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA
              utmSource="freelancers"
              utmCampaign="freelancers_landing"
            >
              Boost My Proposals Now
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
          Join <strong>{totalConceptsCount} freelancers</strong> who&apos;ve
          already improved their proposals with CheckMVP 🚀
        </p>
      </div>

      <RandomMessage />

      <Section heading="Why Use CheckMVP Before You Bid?">
        <SectionGridTwoColumns>
          <SectionCell
            heading="Stand Out from the Crowd"
            description="While others send generic proposals, you'll show deep understanding of the market and project requirements."
          />
          <SectionCell
            heading="Close Deals Faster"
            description="When clients see you've already validated their idea, they're more likely to choose you over the competition."
          />
          <SectionCell
            heading="Build Trust Early"
            description="Show clients you're thorough and professional before the project even starts."
          />
          <SectionCell
            heading="Higher Value Proposals"
            description="Justify better rates with data-backed insights and professional analysis."
          />
        </SectionGridTwoColumns>
      </Section>

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA utmSource="freelancers" utmCampaign="freelancers_landing">
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
        description="Get detailed insights about market size, trends, and opportunities."
      />

      <SectionCell
        heading="Competitor Research"
        description="Understand the competitive landscape and identify gaps in the market."
      />

      <SectionCell
        heading="User Insights"
        description="Define target users and their key pain points with precision."
      />

      <SectionCell
        heading="Value Proposition"
        description="Craft compelling arguments for why the project will succeed."
      />

      <SectionCell
        heading="Risk Assessment"
        description="Identify potential challenges and how to address them proactively."
      />

      <SectionCell
        heading="Action Plan"
        description="Get clear recommendations for project implementation and success."
      />
    </SectionGrid>
  </Section>
)
