'use client'
import React from 'react'
import { FaBullseye, FaSpinner } from 'react-icons/fa'
import Paragraph from './Paragraph'
import Section from './Section'
import SectionHeader from './SectionHeader'
import SimpleUnorderedList from './SimpleUnorderedList'

export interface ProblemEvaluationProps {
  status: 'well-defined' | 'requires_changes' | 'not-well-defined'
  suggestions: string[]
  recommendations: string[]
  pain_points: string[]
  market_existence: string
}

type Props = {
  problem: string
  problemEvaluation: ProblemEvaluationProps | null
}

const ProblemEvaluationPage = ({ problem, problemEvaluation }: Props) => (
  <div>
    <SectionHeader Icon={FaBullseye} color="text-purple-600">
      Problem Evaluation:{' '}
      {problemEvaluation ? (
        <span
          className={
            problemEvaluation.status === 'well-defined'
              ? 'text-green-600'
              : problemEvaluation.status === 'requires_changes'
                ? 'text-orange-600'
                : 'text-red-600'
          }
        >
          {problemEvaluation.status === 'well-defined'
            ? 'Well-defined'
            : problemEvaluation.status === 'requires_changes'
              ? 'Requires changes'
              : 'Not well-defined'}
        </span>
      ) : (
        <FaSpinner className="inline animate-spin text-blue-500" />
      )}
    </SectionHeader>

    {problemEvaluation && (
      <>
        {problemEvaluation.market_existence && (
          <Section>
            <Paragraph>{problemEvaluation.market_existence}</Paragraph>
          </Section>
        )}

        {problemEvaluation.pain_points.length > 0 && (
          <Section header="Pain Points:">
            <SimpleUnorderedList items={problemEvaluation.pain_points} />
          </Section>
        )}

        <Section header="How You Defined The Problem:">
          <Paragraph>
            {problem.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Paragraph>
        </Section>

        {problemEvaluation.suggestions.length > 0 && (
          <Section header="Suggestions to Improve Your Problem Statement:">
            <SimpleUnorderedList items={problemEvaluation.suggestions} />
          </Section>
        )}

        {problemEvaluation.recommendations.length > 0 && (
          <Section header="Alternative Problem Statements That Might Fit Better:">
            <SimpleUnorderedList items={problemEvaluation.recommendations} />
          </Section>
        )}
      </>
    )}
  </div>
)

export default ProblemEvaluationPage
