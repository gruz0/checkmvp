import React from 'react'
import NewIdeaForm from '@/components/NewIdeaForm'
import { createIdeaLimiterKey, getLimits } from '@/lib/rateLimiter'

export const dynamic = 'force-dynamic'

export default async function NewIdeaPage() {
  const limiter = await getLimits(createIdeaLimiterKey)

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-4xl font-bold">
        Validate Your Product Idea Quickly
      </h1>

      {limiter.isAllowed ? (
        <>
          <p className="mb-2 text-xl">
            Answer first two key questions to start and we&apos;ll help you
            understand if your idea solves a real problem and whether your
            target audience is well-defined. If you&apos;re having trouble
            answering these questions, don&apos;t worry! Just give us your best
            guess, and we&apos;ll help refine it in the next step.
          </p>

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
