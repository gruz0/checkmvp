import Link from 'next/link'
import React from 'react'
import RandomMessage from '@/components/RandomMessage'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'

export const dynamic = 'force-dynamic'

const repository = new ConceptRepositorySQLite()

async function getTotalConceptsCount(): Promise<number> {
  return await repository.getTotal()
}

interface SectionProps {
  heading: string
  children: React.ReactNode
}

interface SectionGridProps {
  children: React.ReactNode
}

interface SectionCellProps {
  heading: string
  description: string
}

export default async function ProductManagerLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-blue-600 md:mb-8 md:mt-4 md:text-4xl lg:mb-8 dark:text-gray-100">
        Plan Your Roadmap with Confidence
      </h1>

      <p className="mb-6 text-center text-lg font-semibold md:text-xl lg:mb-10 lg:text-2xl">
        Managing multiple features? CheckMVP helps you prioritize what really
        matters by giving you early, data-backed insights.
      </p>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <div className="mb-6 space-y-4 text-lg">
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Early Validation without costly dev cycles</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Market & Competitor Analysis for positioning</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>SWOT & User Profiles for clear targeting</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Actionable Reports to align your team</p>
            </div>
          </div>

          <div className="mb-10 pt-6 text-center md:mb-6">
            <Link
              href="/start?utm_source=product_managers&utm_medium=primary_cta&utm_campaign=pm_landing"
              className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Streamline My Roadmap
            </Link>
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
          Join <strong>{totalConceptsCount} product managers</strong>{' '}
          who&apos;ve already improved their feature planning with CheckMVP 🚀
        </p>
      </div>

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

      <RandomMessage />

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <Link
          href="/start?utm_source=product_managers&utm_medium=bottom_cta&utm_campaign=pm_landing"
          className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Now
        </Link>
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

const Section: React.FC<SectionProps> = ({ heading, children }) => (
  <div className="mt-8 pb-4 md:mt-10 md:pb-6 lg:mt-14 lg:pb-8">
    <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
      {heading}
    </h2>
    {children}
  </div>
)

const SectionGrid: React.FC<SectionGridProps> = ({ children }) => (
  <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
    {children}
  </div>
)

const SectionGridTwoColumns: React.FC<SectionGridProps> = ({ children }) => (
  <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 md:gap-6 lg:gap-8">
    {children}
  </div>
)

const SectionCell: React.FC<SectionCellProps> = ({ heading, description }) => (
  <div className="rounded-lg bg-gray-50 px-6 py-5 shadow-lg lg:hover:bg-gray-100 dark:bg-gray-700 dark:lg:hover:bg-gray-600">
    <h3 className="mb-2 text-center text-xl font-semibold md:mb-3">
      {heading}
    </h3>
    <p className="text-center md:text-left">{description}</p>
  </div>
)
