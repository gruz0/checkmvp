import React from 'react'
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

export const dynamic = 'force-dynamic'

const repository = new ConceptRepositorySQLite()

async function getTotalConceptsCount(): Promise<number> {
  return await repository.getTotal()
}

export default async function ProductManagerLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Plan Your Roadmap with Confidence</Heading>

      <Subheading>
        Managing multiple features? CheckMVP helps you prioritize what really
        matters by giving you early, data-backed insights.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'Early Validation without costly dev cycles',
              'Market & Competitor Analysis for positioning',
              'SWOT & User Profiles for clear targeting',
              'Actionable Reports to align your team',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA
              utmSource="product_managers"
              utmCampaign="product_managers_landing"
            >
              Streamline My Roadmap
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

      <Section heading="Make Better Decisions Sooner">
        <SectionGridTwoColumns>
          <SectionCell
            heading="Data-Driven Planning"
            description="Stop relying on hunches. Get AI-powered insights to validate your feature ideas before committing development resources."
          />
          <SectionCell
            heading="Team Alignment"
            description="Share clear, professional reports that get everyone on the same page about feature priorities and direction."
          />
          <SectionCell
            heading="Resource Optimization"
            description="Focus development efforts on features with validated user demand and market potential."
          />
          <SectionCell
            heading="Faster Decision Making"
            description="Quick, comprehensive analysis helps you make informed decisions about your product roadmap."
          />
        </SectionGridTwoColumns>
      </Section>

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA
          utmSource="product_managers"
          utmCampaign="product_managers_landing"
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
        heading="Feature Analysis"
        description="Evaluate each feature's potential impact and alignment with user needs."
      />

      <SectionCell
        heading="Market Fit"
        description="Understand how new features position your product in the market."
      />

      <SectionCell
        heading="User Impact"
        description="Gauge potential user adoption and satisfaction for new features."
      />

      <SectionCell
        heading="Implementation Insights"
        description="Get recommendations on feature scope and development priorities."
      />

      <SectionCell
        heading="Competitive Edge"
        description="See how your planned features compare to competitor offerings."
      />

      <SectionCell
        heading="Risk Assessment"
        description="Identify potential challenges and dependencies before development."
      />
    </SectionGrid>
  </Section>
)
