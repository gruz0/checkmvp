import React from 'react'
import ConceptForm from '@/components/ConceptForm'
import { createIdeaLimiterKey, getLimits } from '@/lib/rateLimiter'

export const dynamic = 'force-dynamic'

export default async function StartPage({
  searchParams,
}: {
  searchParams: { problem?: string }
}) {
  const limiter = await getLimits(createIdeaLimiterKey)

  const problem = searchParams.problem || ''

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {limiter.isAllowed ? (
        <>
          <h1 className="mb-6 text-3xl font-bold text-[#023840] md:mb-8 md:text-4xl dark:text-gray-100">
            Big Insights Start With Small Ideas! 🚀
          </h1>

          <ConceptForm problem={problem} region="worldwide" />
        </>
      ) : (
        <>
          <h1 className="mb-6 text-3xl font-bold text-blue-600 md:mb-8 md:text-4xl">
            Unfortunately...
          </h1>

          <div className="mt-8 flex items-center rounded-lg border border-blue-300 bg-blue-50 p-4 text-xl">
            <p className="text-lg">
              We provide {limiter.limit} free reports per hour, and the limit
              has been reached by indie makers and founders.
              <br />
              Limits will be reset at {limiter.resetAt.toUTCString()}. Please
              try again later.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
