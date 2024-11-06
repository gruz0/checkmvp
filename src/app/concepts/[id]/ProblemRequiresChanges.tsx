'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ConceptForm from '@/components/ConceptForm'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ProblemEvaluation {
  status: 'well-defined' | 'requires_changes' | 'not-well-defined'
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
}

interface Props {
  conceptId: string
  problem: string
  evaluation: ProblemEvaluation
}

const ProblemRequiresChanges = ({ conceptId, problem, evaluation }: Props) => {
  const [status, setStatus] = useState<string>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setStatus('loading')
      setErrorMessage(null)

      const res = await fetch(`/api/concepts/${conceptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 201) {
        const data = await res.json()
        router.push(`/ideas/${data.idea_id}`)
        setStatus('success')
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
      {evaluation.marketExistence ? (
        <Section header="Market Existence:">
          <Paragraph>{evaluation.marketExistence}</Paragraph>
        </Section>
      ) : (
        <Section header="Oops! We Need a Bit More Information 🤔">
          <Paragraph>
            It looks like the problem you&apos;ve provided is a little too vague
            for us to figure out the market landscape. To give you the best
            insights, could you please add more details about the specific
            challenges your product addresses? The clearer your problem
            definition, the better we can help you understand the potential
            market for your idea.
          </Paragraph>

          <Paragraph>
            Feel free to give it another shot in the form below!
          </Paragraph>
        </Section>
      )}

      <Section header="How To Improve Your Problem Statement:">
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {evaluation.suggestions.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      {evaluation.recommendations.length > 0 && (
        <Section header="Alternative Problem Statements:">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {evaluation.recommendations.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 transition-transform hover:scale-105 hover:shadow-lg md:p-6"
              >
                <p className="grow md:text-lg">{item}</p>

                <div className="mt-6">
                  <Link
                    href={{
                      pathname: '/start',
                      query: { problem: item },
                    }}
                    className="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-indigo-700"
                  >
                    Validate This Problem Instead
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <hr className="my-6 md:my-8" />

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      {evaluation.marketExistence && evaluation.targetAudience.length > 0 ? (
        <div className="py-2 text-center md:py-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xl font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:px-6 md:py-4 md:text-2xl"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Saving...' : 'Go To Detailed Analysis'}
          </button>
        </div>
      ) : (
        <ConceptForm problem={problem} />
      )}
    </div>
  )
}

export default ProblemRequiresChanges