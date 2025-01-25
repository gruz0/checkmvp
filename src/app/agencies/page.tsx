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

export default async function AgencyLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Help Clients Make Smart Decisions First</Heading>

      <Subheading>
        Clients come with big dreams but often lack clarity. CheckMVP gives you
        a solid starting point for any new project—before a single line of code
        is written.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'Fast Concept Review with AI-powered analysis',
              'Competitor & SWOT Analysis for clear positioning',
              'Scope Control through early validation',
              'Professional PDF Reports for client alignment',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA utmSource="agencies" utmCampaign="agencies_landing">
              Start Validating Today
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
          Join <strong>{totalConceptsCount} agencies</strong> who&apos;ve
          already improved their client projects with CheckMVP 🚀
        </p>
      </div>

      <Section heading="Why Validate Before Development?">
        <SectionGridTwoColumns>
          <SectionCell
            heading="Reduce Scope Creep"
            description="With clear objectives and validated features, your team can focus on building what matters. No more mid-project pivots or endless revisions."
          />
          <SectionCell
            heading="Strengthen Client Trust"
            description="Show that your agency relies on data, not just instincts. Build confidence in your process from day one with concrete insights."
          />
          <SectionCell
            heading="Faster Approvals"
            description="Getting everyone on the same page from the start speeds up the green light. Clear validation means fewer rounds of stakeholder reviews."
          />
          <SectionCell
            heading="Better Project Planning"
            description="Use validation insights to create more accurate timelines and resource allocations. Start projects with confidence and clarity."
          />
        </SectionGridTwoColumns>
      </Section>

      <RandomMessage />

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA utmSource="agencies" utmCampaign="agencies_landing">
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
        description="Get a clear picture of the market landscape and opportunities for your client's project."
      />

      <SectionCell
        heading="Feature Prioritization"
        description="Identify must-have features vs nice-to-haves for the initial MVP launch."
      />

      <SectionCell
        heading="Target Users"
        description="Understand who will actually use the product and what they need most."
      />

      <SectionCell
        heading="Competition Review"
        description="See what others are doing and how your client's solution can stand out."
      />

      <SectionCell
        heading="Risk Assessment"
        description="Spot potential challenges early and plan mitigation strategies."
      />

      <SectionCell
        heading="Strategic Direction"
        description="Get clear recommendations for the development roadmap ahead."
      />
    </SectionGrid>
  </Section>
)
