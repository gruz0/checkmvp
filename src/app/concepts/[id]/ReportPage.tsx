'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import RandomMessage from '@/components/RandomMessage'
import ProblemEvaluationPage from './ProblemEvaluationPage'
import type { ProblemEvaluationProps } from './ProblemEvaluationPage'

interface Concept {
  id: string
  problem: string
  evaluation: ProblemEvaluationProps | null
}

interface Props {
  concept: Concept
}

const reloadInterval = 5000

const ReportPage = ({ concept }: Props) => {
  const router = useRouter()

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (!concept.evaluation) {
      intervalId = setInterval(() => {
        router.refresh()
      }, reloadInterval)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [concept.evaluation, router])

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">
        Concept Evaluation:{' '}
        {concept.evaluation ? (
          <span
            className={
              concept.evaluation.status === 'well-defined'
                ? 'text-green-600'
                : concept.evaluation.status === 'requires_changes'
                  ? 'text-orange-600'
                  : 'text-red-600'
            }
          >
            {concept.evaluation.status === 'well-defined'
              ? 'Well-defined'
              : concept.evaluation.status === 'requires_changes'
                ? 'Requires changes'
                : 'Not well-defined'}
          </span>
        ) : (
          <span>Loading...</span>
        )}
      </h1>

      {concept.evaluation ? (
        <>
          <hr className="my-6 md:my-8" />

          <ProblemEvaluationPage
            conceptId={concept.id}
            problem={concept.problem}
            evaluation={concept.evaluation}
          />
        </>
      ) : (
        <>
          <FetchingDataMessage />

          <RandomMessage />
        </>
      )}
    </div>
  )
}

export default ReportPage
