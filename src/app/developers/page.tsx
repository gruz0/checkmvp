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

export default async function DeveloperLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Turn Your Side Project into a Real Opportunity</Heading>

      <Subheading>
        Got a cool idea but no time to validate it? Let us do the heavy lifting
        so you can focus on your day job—and still have energy left to code.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'Get a quick, AI-powered structured analysis',
              'Spot real opportunities, market, and competitors',
              'Validate your hypothesis first, code later',
              'Actionable PDF Report with clear next steps',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA utmSource="developers" utmCampaign="developers_landing">
              Try CheckMVP for Free
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
          Join <strong>{totalConceptsCount} developers</strong> who&apos;ve
          already validated their side projects with CheckMVP 🚀
        </p>
      </div>

      <Section heading="Why Validate Before Coding?">
        <SectionGridTwoColumns>
          <SectionCell
            heading="Avoid Wasted Effort"
            description="Don't burn time on features nobody wants. Get clear insights about what your potential users actually need before writing a single line of code."
          />
          <SectionCell
            heading="Gain Confidence"
            description="Back your ideas with data and clear insights. Know exactly what you're building and why it matters to your target audience."
          />
          <SectionCell
            heading="Balance Your Schedule"
            description="Let CheckMVP streamline research so you can still meet work deadlines. Get comprehensive validation without sacrificing your precious evening hours."
          />
          <SectionCell
            heading="Smart Resource Management"
            description="Focus your limited time and energy on the most promising projects. Get a clear picture of market opportunities before investing your nights and weekends."
          />
        </SectionGridTwoColumns>
      </Section>

      <RandomMessage />

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA utmSource="developers" utmCampaign="developers_landing">
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
        heading="Market Gap Analysis"
        description="Identify underserved needs and opportunities that align with your technical skills."
      />

      <SectionCell
        heading="Technical Feasibility"
        description="Get insights about potential tech stack choices and implementation challenges."
      />

      <SectionCell
        heading="MVP Feature Set"
        description="Determine the core features needed for a viable first version that users will love."
      />

      <SectionCell
        heading="Monetization Options"
        description="Explore different revenue models that work well for developer-led projects."
      />

      <SectionCell
        heading="Growth Strategy"
        description="Learn how to attract early users and grow your project while working full-time."
      />

      <SectionCell
        heading="Risk Assessment"
        description="Understand potential technical and market risks before investing your time."
      />
    </SectionGrid>
  </Section>
)
