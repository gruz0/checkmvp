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
  number?: string
  heading: string
  description: string
}

export default async function LandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-blue-600 md:mb-8 md:mt-4 md:text-4xl lg:mb-8 dark:text-gray-100">
        Your AI Co-Founder for Startup Validation
      </h1>

      <p className="mb-6 text-center text-lg font-semibold md:text-xl lg:mb-10 lg:text-2xl">
        Get clarity and confidence about your product or SaaS idea in 3-5
        minutes.
      </p>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <div className="mb-6 space-y-4 text-lg">
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Identify your target audience and their pain points</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Get insights about competitors and opportunities</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Generate product names and elevator pitches</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold text-green-600">✓</span>
              <p>Get a complete SWOT analysis and next steps</p>
            </div>
          </div>

          <div className="mb-10 pt-6 text-center md:mb-6">
            <Link
              href="/start"
              className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Take The First Step
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
          Join <strong>{totalConceptsCount} founders</strong> who&apos;ve
          already validated their startup ideas with CheckMVP 🚀
        </p>
      </div>

      <Section heading="Why Founders Trust CheckMVP">
        <SectionGridTwoColumns>
          <SectionCell
            heading="100% Free & No Registration"
            description="No sign-up. No hidden fees. Just type your idea and click “Detailed Analysis.” You can even download a PDF of your findings. I want to make it as easy as possible for anyone to refine their startup idea without getting stuck in complicated onboarding flows."
          />
          <SectionCell
            heading="Instant AI-Powered Insights"
            description="CheckMVP uses a GPT-4o model behind the scenes, giving you a comprehensive report on your product idea—covering competitors, market trends, potential target audiences, SWOT analysis, ideas for domain names, and more. All it takes is one click."
          />
          <SectionCell
            heading="Built for Founders, by a Founder"
            description="I know firsthand how important it is to save time and energy when you’re bootstrapping a new startup. That’s why CheckMVP delivers structured insights designed for idea validation, minus the hassle of tinkering with prompts yourself. I spent weeks on polishing prompts."
          />
          <SectionCell
            heading="Honest Disclaimer (About AI Limitations)"
            description="Sometimes AI may provide outdated information or “hallucinate.” If you need ultra-accurate or highly customized analysis, I offer a manually curated, deep-dive report using the latest GPT-o1 model (plus my personal experience as a system architect)."
          />
        </SectionGridTwoColumns>
      </Section>

      <RandomMessage />

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <Link
          href="/start"
          className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Now
        </Link>
      </div>
    </div>
  )
}

const WhatIsInside = () => (
  <Section heading="What Is Inside Your Report?">
    <SectionGrid>
      <SectionCell
        heading="Competitors & Positioning"
        description="Spot who’s already tackling a similar problem and find a clear way to stand out."
      />

      <SectionCell
        heading="Target Audience & Value"
        description="Pin down who really needs your product and why they’d pick it over anything else out there."
      />

      <SectionCell
        heading="SWOT & Opportunities"
        description="Lay out strengths, weaknesses, and fresh opportunities, so you know where to focus first."
      />

      <SectionCell
        heading="Market & Trends"
        description="Check what’s happening in your industry so you can see if your idea makes sense or needs a new angle."
      />

      <SectionCell
        heading="Names & Pitches"
        description="Explore a few name ideas and grab a quick elevator pitch—handy for sharing your concept in seconds."
      />

      <SectionCell
        heading="Growth & Content"
        description="Learn which channels fit best for your launch and get quick tips on content that resonates with early adopters."
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

const SectionCell: React.FC<SectionCellProps> = ({
  number,
  heading,
  description,
}) => (
  <div className="rounded-lg bg-gray-50 px-6 py-5 shadow-lg lg:hover:bg-gray-100 dark:bg-gray-700 dark:lg:hover:bg-gray-600">
    {number && (
      <div className="mb-2 text-center text-4xl font-bold text-blue-600 md:mb-4 md:text-5xl">
        {number}
      </div>
    )}

    <h3 className="mb-2 text-center text-xl font-semibold md:mb-3">
      {heading}
    </h3>

    <p className="text-center md:text-left">{description}</p>
  </div>
)
