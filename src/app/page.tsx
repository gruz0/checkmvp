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

export default async function LandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading>Your AI Co-Founder for Startup Validation</Heading>

      <Subheading>
        Get clarity and confidence about your product or SaaS idea in 3-5
        minutes.
      </Subheading>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <CheckList
            items={[
              'Identify your target audience and their pain points',
              'Get insights about competitors and opportunities',
              'Generate product names and elevator pitches',
              'Get a complete SWOT analysis and next steps',
            ]}
          />

          <div className="mb-10 pt-6 text-center md:mb-6">
            <PrimaryCTA utmSource="landing" utmCampaign="landing_page">
              Take The First Step
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
          Join <strong>{totalConceptsCount} founders</strong> who&apos;ve
          already validated their startup ideas with CheckMVP 🚀
        </p>
      </div>

      <RandomMessage />

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

      <WhatIsInside />

      <div className="mb-8 mt-2 pt-6 text-center">
        <SecondaryCTA utmSource="landing" utmCampaign="landing_page">
          Start Now
        </SecondaryCTA>
      </div>
    </div>
  )
}

const WhatIsInside = () => (
  <Section heading="What Is Inside Your Report?">
    <SectionGrid>
      <SectionCell
        heading="Competitors & Positioning"
        description="Spot who's already tackling a similar problem and find a clear way to stand out."
      />

      <SectionCell
        heading="Target Audience & Value"
        description="Pin down who really needs your product and why they'd pick it over anything else out there."
      />

      <SectionCell
        heading="SWOT & Opportunities"
        description="Lay out strengths, weaknesses, and fresh opportunities, so you know where to focus first."
      />

      <SectionCell
        heading="Market & Trends"
        description="Check what's happening in your industry so you can see if your idea makes sense or needs a new angle."
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
