'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePlausible } from 'next-plausible'
import React, { useState } from 'react'
import ConceptForm from '@/components/ConceptForm'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'
import { Goals } from '@/lib/goals'
import ClarityScoreSection from './ClarityScoreSection'
import LanguageAnalysisSection from './LanguageAnalysisSection'
import { ProblemEvaluation } from './types'

interface Props {
  conceptId: string
  problem: string
  evaluation: ProblemEvaluation
}

const ProblemRequiresChanges = ({ conceptId, problem, evaluation }: Props) => {
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
          page: 'ProblemRequiresChanges',
          buttonId: 'requires_changes',
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
      <h1 className="mb-6 text-3xl font-bold text-orange-600 md:text-4xl">
        Looks Good, But Let&apos;s Polish It Up
      </h1>

      {evaluation.marketExistence ? (
        <>
          <p className="mb-6 text-lg md:text-2xl">
            Your idea is off to a great start. We can either dive into the full
            analysis now, or you can refine your problem statement for even more
            accurate insights.
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
        </>
      ) : (
        <Section header="Hmm, We Need More Clarity! 🤔">
          <Paragraph>
            No worries—sometimes ideas need a bit more detail. Let&apos;s make
            sure we fully capture what you&apos;re trying to build, so we can
            offer the best insights.
          </Paragraph>
        </Section>
      )}

      <hr className="my-6 md:my-8" />

      <Section header="📝 Your Original Statement:">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg dark:bg-gray-900/50">
          {problem.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </Section>

      <ClarityScoreSection clarityScore={evaluation.clarityScore} />

      <LanguageAnalysisSection languageAnalysis={evaluation.languageAnalysis} />

      <hr className="my-6 md:my-8" />

      <Section header="✍️ Try These Steps to Sharpen Your Idea:">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {evaluation.suggestions.map((item, index) => (
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

      {evaluation.recommendations.length > 0 && (
        <>
          <hr className="my-6 md:my-8" />

          <Section header="💡 Or Try These Auto-Generated Rewrites and Tweaks:">
            <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6">
              {evaluation.recommendations.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:bg-gray-900/50"
                >
                  <p className="grow md:text-lg">{item}</p>

                  <div className="mt-6">
                    <Link
                      href={{
                        pathname: '/start',
                        query: { problem: item },
                      }}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
                    >
                      Validate This Problem Instead
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {evaluation.targetAudience.length > 0 && (
        <>
          <hr className="my-6 md:my-8" />

          <Section header="👥 Who's This Really For?">
            <div className="grid grid-cols-1 gap-6">
              {evaluation.targetAudience.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 md:p-6 md:pb-0 dark:bg-gray-900/50"
                >
                  <p className="mb-4 text-lg font-bold md:text-xl">
                    {item.segment}
                  </p>

                  <p className="mb-4 md:text-lg">{item.description}</p>

                  <p className="mb-4 font-semibold md:text-lg">
                    Their Challenges:
                  </p>

                  <SimpleUnorderedList items={item.challenges} />
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      <hr className="my-6 md:my-8" />

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      {evaluation.marketExistence && evaluation.targetAudience.length > 0 ? (
        <Section header="Ready for a Full Breakdown?">
          <p className="mb-6 text-lg md:text-xl">
            Explore complete competitor breakdowns, marketing angles, and more.
          </p>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:px-6 md:py-4 md:text-2xl"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Saving...' : 'Go To Detailed Analysis'}
          </button>
        </Section>
      ) : (
        <ConceptForm problem={problem} hideExamples />
      )}
    </div>
  )
}

export default ProblemRequiresChanges
