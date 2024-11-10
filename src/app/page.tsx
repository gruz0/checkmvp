import Link from 'next/link'
import React from 'react'
import Plausible from '@/components/Plausible'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'

export const dynamic = 'force-dynamic'

const repository = new ConceptRepositorySQLite()

async function getTotalConceptsCount(): Promise<number> {
  return await repository.getTotal()
}

export default async function LandingPage() {
  const totalConceptsCount = await getTotalConceptsCount()

  return (
    <>
      <Plausible />

      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="mb-4 text-3xl font-bold text-blue-600 md:mb-8 md:text-4xl">
          Validate Your Product or Startup Idea Fast!
        </h1>

        <div className="mb-6 md:mb-8">
          <p className="text-lg md:text-2xl">
            Start by answering one question, and we&apos;ll tell you if we got
            something valuable about your product idea and target audience. Step
            by step guide to validate your idea super fast.
          </p>
        </div>

        <div className="mb-2 rounded-lg border border-green-300 bg-green-50 p-4 text-lg text-green-800 md:mb-8">
          <p>
            We&apos;ve analyzed <strong>{totalConceptsCount} ideas</strong> so
            far! Let&apos;s see how we can help you today 🤗
          </p>
        </div>

        <div className="mb-8 pt-8 text-center">
          <Link
            href="/start"
            className="justify-center rounded-md border border-transparent bg-blue-600 px-8 py-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Take the First Step
          </Link>
        </div>
      </div>
    </>
  )
}
