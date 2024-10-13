import Link from 'next/link'
import React from 'react'
import NewIdeaForm from '@/components/NewIdeaForm'
import { IdeaService } from '@/lib/IdeaService'
import { SQLiteIdeaRepository } from '@/lib/SQLiteIdeaRepository'
import { createIdeaLimiterKey, getLimits } from '@/lib/rateLimiter'

export const dynamic = 'force-dynamic'

const repository = new SQLiteIdeaRepository()
const ideaService = new IdeaService(repository)

async function getTotalIdeasCount(): Promise<number> {
  return await ideaService.getTotalIdeasCount()
}

export default async function NewIdeaPage() {
  const limiter = await getLimits(createIdeaLimiterKey)
  const totalIdeasCount = await getTotalIdeasCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-8 text-3xl font-bold text-indigo-600 md:text-4xl">
        Validate Your Product Idea in a Minute!
      </h1>

      {limiter.isAllowed ? (
        <>
          <div className="flex flex-col md:mb-8 md:flex-row md:space-x-8">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">Why?</h2>

              <p className="text-lg md:text-xl">
                We often spend a lot of time on product ideas that don&apos;t
                have a real market. Validating your idea helps avoid wasting
                that time and ensures you&apos;re building something people
                actually want.
              </p>
            </div>

            <div className="mb-6 md:mb-0 md:w-1/2">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">How?</h2>

              <p className="text-lg md:text-xl">
                Start by answering two key questions, and we&apos;ll guide you
                in figuring out if your idea truly addresses a real problem and
                if you have a clear understanding of your target audience.
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-center rounded-lg border border-green-300 bg-green-50 p-4 text-lg text-green-800">
            <span className="mr-2">🎉</span>
            <p>
              We&apos;ve analyzed <strong>{totalIdeasCount} ideas</strong> so
              far! Join{' '}
              <Link
                href="https://x.com/itmistakes_com"
                target="_blank"
                rel="nofollow noopener"
                className="text-blue-600 underline"
              >
                the community of creators
              </Link>
              {' on Twitter (X) and see how we can help you!'}
            </p>
          </div>

          <NewIdeaForm />
        </>
      ) : (
        <div className="mt-8 flex items-center rounded-lg border border-blue-300 bg-blue-50 p-4 text-xl">
          <p className="text-lg">
            We provide {limiter.limit} free reports per hour, and the limit has
            been reached by indie makers and founders.
            <br />
            Limits will be reset at {limiter.resetAt.toUTCString()}. Please try
            again later.
          </p>
        </div>
      )}
    </div>
  )
}
