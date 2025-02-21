import Link from 'next/link'
import React from 'react'
import {
  Heading,
  Section,
  SectionCell,
  SectionGrid,
  Subheading,
} from '@/components/LandingPage'

const ToolsPage: React.FC = () => (
  <div className="p-4 md:p-6 lg:p-8">
    <Heading>🛠️ AI Tools for Modern Founders</Heading>

    <Subheading>
      Explore our free, no-registration tools powered by AI to help you validate
      and grow your startup faster. Built by founders, for founders.
    </Subheading>

    <Section heading="Boost Your Startup with AI:">
      <SectionGrid>
        <Link href="/tools/hypothesis-generator" className="group block h-full">
          <SectionCell
            heading="Hypothesis Generator"
            description="Transform random ideas into structured business hypotheses. Mix technology, trends, and business models to spark innovative startup concepts."
            centerizeDescription
          >
            <button className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
              Try Now
            </button>
          </SectionCell>
        </Link>

        <SectionCell
          heading="Market Size Calculator"
          description="Calculate your Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM) with AI assistance."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="Pitch Deck Outline"
          description="Generate a customized pitch deck outline based on your startup's stage, industry, and target audience. Get slide-by-slide recommendations."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="Startup Name Generator"
          description="Get creative, brandable name suggestions based on your industry and value proposition, complete with domain availability checking across popular TLDs."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="One-Liner Pitch Generator"
          description="Craft a compelling elevator pitch that perfectly captures your product, problem, and unique value proposition in just 1-2 powerful sentences."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="User Persona Creator"
          description="Generate detailed user personas with pain points, motivations, and demographics based on your target market and problem statement."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="Competitor Analysis Tool"
          description="Create comprehensive comparison matrices to identify market gaps, differentiators, and competitive advantages in your space."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="SaaS Pricing Strategist"
          description="Get data-driven recommendations for your pricing strategy, including tier structure, pricing models, and competitive positioning."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="Marketing Plan Generator"
          description="Create a targeted marketing strategy with channel recommendations, budget allocation, and KPIs tailored to your startup's stage."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="VCs Outreach Assistant"
          description="Draft personalized investor outreach messages that highlight your value proposition and traction in a compelling way."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="Vision & Mission Creator"
          description="Generate inspiring vision and mission statements that align with your startup's product, impact, and long-term goals."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>

        <SectionCell
          heading="MVP Feature Prioritizer"
          description="Prioritize your product features using proven frameworks like MoSCoW or RICE to build a focused and impactful MVP."
          centerizeDescription
        >
          <span className="rounded-lg bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-500 dark:bg-blue-500/20">
            Coming Soon
          </span>
        </SectionCell>
      </SectionGrid>
    </Section>
  </div>
)

export default ToolsPage
