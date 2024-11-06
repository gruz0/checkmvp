'use client'
import React from 'react'
import NotWellDefinedProblem from './NotWellDefinedProblem'
import ProblemRequiresChanges from './ProblemRequiresChanges'
import WellDefinedProblem from './WellDefinedProblem'

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

export interface ProblemEvaluationProps {
  status: 'well-defined' | 'requires_changes' | 'not-well-defined'
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
}

type Props = {
  conceptId: string
  problem: string
  evaluation: ProblemEvaluationProps
}

const ProblemEvaluationPage = ({ conceptId, problem, evaluation }: Props) => (
  <div>
    {evaluation.status === 'not-well-defined' && (
      <NotWellDefinedProblem problem={problem} evaluation={evaluation} />
    )}

    {evaluation.status === 'requires_changes' && (
      <ProblemRequiresChanges
        conceptId={conceptId}
        problem={problem}
        evaluation={evaluation}
      />
    )}

    {evaluation.status === 'well-defined' && (
      <WellDefinedProblem conceptId={conceptId} evaluation={evaluation} />
    )}
  </div>
)

export default ProblemEvaluationPage
