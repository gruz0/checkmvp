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

export default async function MVPSpecialistLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Offer Smarter MVPs Right from the Start</Heading>

      <Subheading>
        Clients want to know their investment is safe. CheckMVP gives you a
        clear, data-backed approach to launch confident MVPs.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'Rapid Idea Vetting before development starts',
              'Detailed Market Gap Analysis for positioning',
              'Consultant-Ready Reports for presentations',
              'Lean & Efficient MVP planning process',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA
              utmSource="mvp_specialists"
              utmCampaign="mvp_specialists_landing"
            >
              Try CheckMVP for Client Projects
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
          Join <strong>{totalConceptsCount} MVP specialists</strong> who&apos;ve
          already improved their client projects with CheckMVP 🚀
        </p>
      </div>

      <Section heading="Keep Clients Happy & Informed">
        <SectionGridTwoColumns>
          <SectionCell
            heading="Build Trust Early"
            description="When clients see real validation data, they trust the process. Show them concrete insights before writing a single line of code."
          />
          <SectionCell
            heading="Streamline Communication"
            description="Use professional reports to align stakeholders and get faster approvals on your MVP recommendations."
          />
          <SectionCell
            heading="Reduce Project Risk"
            description="Validate assumptions early and adjust course before investing significant development resources."
          />
          <SectionCell
            heading="Optimize Resources"
            description="Focus your team's efforts on building features that data shows will matter most to users."
          />
        </SectionGridTwoColumns>
      </Section>

      <RandomMessage />

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA
          utmSource="mvp_specialists"
          utmCampaign="mvp_specialists_landing"
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
        heading="Market Opportunity"
        description="Identify underserved needs and potential revenue streams in your target market."
      />

      <SectionCell
        heading="User Research"
        description="Get detailed insights about your target users and their key pain points."
      />

      <SectionCell
        heading="MVP Scope"
        description="Define the essential features needed for a successful initial launch."
      />

      <SectionCell
        heading="Competitive Analysis"
        description="Understand the competitive landscape and find your unique advantage."
      />

      <SectionCell
        heading="Launch Strategy"
        description="Get recommendations for early user acquisition and growth tactics."
      />

      <SectionCell
        heading="Risk Mitigation"
        description="Identify potential challenges and prepare contingency plans early."
      />
    </SectionGrid>
  </Section>
)
