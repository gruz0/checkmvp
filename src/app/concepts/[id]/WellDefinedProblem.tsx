'use client'
import { useRouter } from 'next/navigation'
import { usePlausible } from 'next-plausible'
import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import { Goals } from '@/lib/goals'
import ClarityScoreSection from './ClarityScoreSection'
import LanguageAnalysisSection from './LanguageAnalysisSection'
import TargetAudienceSection from './TargetAudienceSection'
import { ProblemEvaluation } from './types'

interface Props {
  conceptId: string
  evaluation: ProblemEvaluation
}

const WellDefinedProblem = ({ conceptId, evaluation }: Props) => {
  const plausible = usePlausible()

  const [status, setStatus] = useState<string>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setStatus('loading')
      setErrorMessage(null)

      plausible(Goals.Analysis, {
        props: {
          page: 'WellDefinedProblem',
          buttonId: 'well_defined',
        },
      })

      const res = await fetch(`/api/concepts/${conceptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 201) {
        const data = await res.json()
        router.push(`/ideas/${data.idea_id}`)
      } else {
        const errorData = await res.json()
        setErrorMessage(errorData.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
      setStatus('error')
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-green-600 md:text-4xl">
        Great news! Your Idea Looks Solid!
      </h1>

      <p className="mb-6 text-lg md:text-2xl">
        Based on your concept, here&apos;s a quick look at your potential
        audience, market gaps, and common pain points. This snapshot uses a
        GPT-4o AI model, so treat it as an informed starting point—not the final
        word.
      </p>

      <p className="mb-6 text-lg md:text-2xl">
        Scroll down to see the highlights and request a detailed report for
        deeper analysis.
      </p>

      <hr className="my-6 md:my-8" />

      <Section header="🔎 How Big Could This Get?">
        <Paragraph>
          {evaluation.marketExistence.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Paragraph>
      </Section>

      <ClarityScoreSection clarityScore={evaluation.clarityScore} />

      <hr className="my-6 md:my-8" />

      <Section header="⚠️ What's Bugging Your Users?">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {evaluation.painPoints.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg dark:bg-gray-900/50"
            >
              <p className="first-letter:float-left first-letter:pr-3 first-letter:text-5xl first-letter:font-bold">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <TargetAudienceSection targetAudience={evaluation.targetAudience} />

      <LanguageAnalysisSection languageAnalysis={evaluation.languageAnalysis} />

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      <hr className="my-6 md:my-8" />

      <Section header="Ready for a Full Breakdown?">
        <p className="mb-6 text-lg md:text-xl">
          Explore complete competitor breakdowns, marketing angles, and more.
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md border border-transparent bg-[#023840] px-4 py-2 text-xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 md:px-6 md:py-4 md:text-2xl dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Saving...' : 'Go To Detailed Analysis'}
        </button>
      </Section>
    </div>
  )
}

export default WellDefinedProblem
