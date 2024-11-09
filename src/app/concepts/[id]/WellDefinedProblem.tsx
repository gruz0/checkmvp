'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

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
  evaluation: ProblemEvaluation
}

const WellDefinedProblem = ({ conceptId, evaluation }: Props) => {
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
      <Section header="Here's What We've Found:">
        <Paragraph>{evaluation.marketExistence}</Paragraph>
      </Section>

      <Section header="Common Pain Points That Are Relevant to The Problem:">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {evaluation.painPoints.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section header="Target Audiences:">
        <div className="grid grid-cols-1 gap-6">
          {evaluation.targetAudience.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 md:p-6 md:pb-0"
            >
              <p className="mb-4 text-lg font-bold md:text-xl">
                {item.segment}
              </p>

              <p className="mb-4 md:text-lg">{item.description}</p>

              <p className="mb-4 font-semibold md:text-lg">Their Challenges:</p>

              <SimpleUnorderedList items={item.challenges} />
            </div>
          ))}
        </div>
      </Section>

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="py-2 text-center md:py-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:px-6 md:py-4 md:text-2xl"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Saving...' : 'Go To Detailed Analysis'}
        </button>
      </div>
    </div>
  )
}

export default WellDefinedProblem
