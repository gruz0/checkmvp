import React from 'react'
import NewIdeaForm from '@/components/NewIdeaForm'
import { createIdeaLimiterKey, getLimits } from '@/lib/rateLimiter'

export const dynamic = 'force-dynamic'

export default async function NewIdeaPage() {
  const limiter = await getLimits(createIdeaLimiterKey)

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="mb-6 text-3xl font-bold text-indigo-600 sm:mb-6 md:mb-8 md:text-4xl">
        Validate Your Product Idea in a Minute!
      </h1>

      {limiter.isAllowed ? (
        <>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h2 className="mb-4 text-2xl font-bold">Why?</h2>
              <p className="text-xl">
                We often spend a lot of time on product ideas that don&apos;t
                have a real market. Validating your idea helps avoid wasting
                that time and ensures you&apos;re building something people
                actually want.
              </p>
            </div>

            <div className="mb-6 md:mb-0 md:w-1/2">
              <h2 className="mb-4 text-2xl font-bold">How?</h2>
              <p className="text-xl">
                Start by answering two key questions, and we&apos;ll guide you
                in figuring out if your idea truly addresses a real problem and
                if you have a clear understanding of your target audience.
              </p>
            </div>
          </div>

          <hr className="my-8" />

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
