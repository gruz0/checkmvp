'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import RandomMessage from '@/components/RandomMessage'
import ProblemEvaluationPage from './ProblemEvaluationPage'
import { ProblemEvaluation } from './types'

interface Concept {
  id: string
  problem: string
  persona: string
  region: string
  productType: string
  stage: string
  evaluation: ProblemEvaluation | null
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
      {concept.evaluation && (
        <ProblemEvaluationPage
          conceptId={concept.id}
          problem={concept.problem}
          persona={concept.persona}
          region={concept.region}
          productType={concept.productType}
          stage={concept.stage}
          evaluation={concept.evaluation}
        />
      )}

      {!concept.evaluation && (
        <>
          <FetchingDataMessage />

          <RandomMessage />
        </>
      )}
    </div>
  )
}

export default ReportPage
