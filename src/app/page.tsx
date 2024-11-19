import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RandomMessage from '@/components/RandomMessage'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import IdeaReport01 from '../../screenshots/idea-report-01.png'
import IdeaReport02 from '../../screenshots/idea-report-02.png'
import IdeaReport03 from '../../screenshots/idea-report-03.png'
import IdeaReport04 from '../../screenshots/idea-report-04.png'

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
      <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-blue-600 md:mb-8 md:mt-4 md:text-4xl lg:mb-12 dark:text-gray-100">
        Can Your Startup Idea Pass The Test?
      </h1>

      <div className="mb-6 flex flex-col md:flex-row md:space-x-10 lg:mb-8">
        <div className="w-full pl-2 md:w-1/2">
          <p className="mb-4 text-lg font-semibold md:mb-6 md:text-xl lg:mb-8 lg:text-2xl">
            Let&apos;s find out in three simple steps:
          </p>

          <ol className="mb-4 list-decimal pl-4 text-lg md:pl-6 md:text-xl lg:text-2xl">
            <li className="mb-2 pl-1 md:pl-2">
              Share your idea and target market
            </li>
            <li className="mb-2 pl-1 md:pl-2">Receive expert feedback fast</li>
            <li className="mb-2 pl-1 md:pl-2">
              Get a detailed validation report
            </li>
          </ol>

          <div className="mb-10 pt-6 text-center md:mb-6">
            <Link
              href="/start"
              className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Now
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
          We&apos;ve analyzed <strong>{totalConceptsCount} ideas</strong> so
          far! Let&apos;s see how we can help you today 🤗
        </p>
      </div>

      <RandomMessage />

      <WhatIsInside />

      <Screenshots />

      <div className="mb-8 mt-2 pt-6 text-center">
        <Link
          href="/start"
          className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ready to Start?
        </Link>
      </div>
    </div>
  )
}

const WhatIsInside = () => (
  <Section heading="What Is Inside Your Report?">
    <SectionGrid>
      <SectionCell
        heading="Get the Full Picture"
        description="An overview of your market, trends, and who you’re up against. Know where you stand and what makes idea unique."
      />

      <SectionCell
        heading="Define Your Value"
        description="A clear look at why people would want your product and who’s most likely to use it. Perfect for focusing your efforts."
      />

      <SectionCell
        heading="Show Off Your Idea"
        description="A quick snapshot of your product’s strengths, plus an elevator pitch and name ideas. Ready to share in seconds."
      />

      <SectionCell
        heading="Connect Your Audience"
        description="Content ideas and ready-made templates for getting your idea in front of people and gathering early feedback."
      />

      <SectionCell
        heading="Soon: Plan Your Launch"
        description="A simple roadmap, testing plan, cost estimates, and clear next steps. Everything you need to go live with confidence."
      />

      <SectionCell
        heading="Soon: Tools & Resources"
        description="Essential tools and resources to make building and launching your idea easier, all in one place. Hidden gems are included!"
      />
    </SectionGrid>
  </Section>
)

const Screenshots = () => (
  <Section heading="Screenshots">
    <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 md:gap-6 lg:gap-8">
      <div className="rounded-lg bg-gray-50 p-2 shadow-lg lg:hover:bg-gray-100 dark:bg-gray-700 dark:lg:hover:bg-gray-600">
        <Link href={IdeaReport01.src} target="_blank">
          <Image
            src={IdeaReport01.src}
            width={IdeaReport01.width}
            height={IdeaReport01.height}
            alt="Idea Report 01"
          />
        </Link>
      </div>

      <div className="rounded-lg bg-gray-50 p-2 shadow-lg lg:hover:bg-gray-100 dark:bg-gray-700 dark:lg:hover:bg-gray-600">
        <Link href={IdeaReport02.src} target="_blank">
          <Image
            src={IdeaReport02.src}
            width={IdeaReport02.width}
            height={IdeaReport02.height}
            alt="Idea Report 02"
          />
        </Link>
      </div>

      <div className="rounded-lg bg-gray-50 p-2 shadow-lg lg:hover:bg-gray-100 dark:bg-gray-700 dark:lg:hover:bg-gray-600">
        <Link href={IdeaReport03.src} target="_blank">
          <Image
            src={IdeaReport03.src}
            width={IdeaReport03.width}
            height={IdeaReport03.height}
            alt="Idea Report 03"
          />
        </Link>
      </div>

      <div className="rounded-lg bg-gray-50 p-2 shadow-lg lg:hover:bg-gray-100 dark:bg-gray-700 dark:lg:hover:bg-gray-600">
        <Link href={IdeaReport04.src} target="_blank">
          <Image
            src={IdeaReport04.src}
            width={IdeaReport04.width}
            height={IdeaReport04.height}
            alt="Idea Report 04"
          />
        </Link>
      </div>
    </div>
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
