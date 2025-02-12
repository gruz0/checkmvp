'use client'
import React from 'react'
import NotWellDefinedProblem from './NotWellDefinedProblem'
import ProblemRequiresChanges from './ProblemRequiresChanges'
import WellDefinedProblem from './WellDefinedProblem'
import { ProblemEvaluation } from './types'

type Props = {
  conceptId: string
  problem: string
  persona: string
  region: string
  evaluation: ProblemEvaluation
}

const ProblemEvaluationPage = ({
  conceptId,
  problem,
  persona,
  region,
  evaluation,
}: Props) => (
  <div>
    {evaluation.status === 'not-well-defined' && (
      <NotWellDefinedProblem
        problem={problem}
        persona={persona}
        region={region}
        evaluation={evaluation}
      />
    )}

    {evaluation.status === 'requires_changes' && (
      <ProblemRequiresChanges
        conceptId={conceptId}
        problem={problem}
        persona={persona}
        region={region}
        evaluation={evaluation}
      />
    )}

    {evaluation.status === 'well-defined' && (
      <WellDefinedProblem conceptId={conceptId} evaluation={evaluation} />
    )}
  </div>
)

export default ProblemEvaluationPage
