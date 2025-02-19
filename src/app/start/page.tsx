import React from 'react'
import ConceptForm from '@/components/ConceptForm'
import { createIdeaLimiterKey, getLimits } from '@/lib/rateLimiter'

export const dynamic = 'force-dynamic'

type SearchParams = {
  problem?: string
  persona?: string
  region?: string
  productType?: string
  stage?: string
}

export default async function StartPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const limiter = await getLimits(createIdeaLimiterKey)

  const problem = searchParams.problem || ''
  const persona = searchParams.persona || ''
  const region = searchParams.region || 'worldwide'
  const productType = searchParams.productType || 'b2c'
  const stage = searchParams.stage || 'idea'

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {limiter.isAllowed ? (
        <>
          <h1 className="mb-6 text-3xl font-bold text-[#023840] md:mb-8 md:text-4xl dark:text-gray-100">
            Big Insights Start With Small Ideas! 🚀
          </h1>

          <ConceptForm
            problem={problem}
            persona={persona}
            region={region}
            productType={productType}
            stage={stage}
          />
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
