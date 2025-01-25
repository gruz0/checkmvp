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

export default async function AgencyLandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-blue-600 md:mb-8 md:mt-4 md:text-4xl lg:mb-8 dark:text-gray-100">
        Help Clients Make Smart Decisions First
      </h1>

      <p className="mb-6 text-center text-lg font-semibold md:text-xl lg:mb-10 lg:text-2xl">
        Clients come with big dreams but often lack clarity. CheckMVP gives you
        a solid starting point for any new project—before a single line of code
        is written.
      </p>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <div className="mb-6 space-y-4 text-lg">
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Fast Concept Review with AI-powered analysis</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Competitor & SWOT Analysis for clear positioning</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Scope Control through early validation</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Professional PDF Reports for client alignment</p>
            </div>
          </div>

          <div className="mb-10 pt-6 text-center md:mb-6">
            <Link
              href="/start?utm_source=agencies&utm_medium=primary_cta&utm_campaign=agency_landing"
              className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Validating Today
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
        <Link
          href="/start?utm_source=agencies&utm_medium=bottom_cta&utm_campaign=agency_landing"
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
