'use client'
import React from 'react'
import {
  FaBullseye,
  FaCheckCircle,
  FaExchangeAlt,
  FaLightbulb,
  FaPen,
  FaTools,
} from 'react-icons/fa'

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
    <h2 className="flex items-center text-2xl font-semibold">
      <FaBullseye className="mr-2 text-purple-600" />
      <p>
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
          <span className="text-gray-600">Analyzing...</span>
        )}
      </p>
    </h2>

    {problemEvaluation && (
      <>
        {problemEvaluation.market_existence && (
          <div className="mb-8">
            <p className="mt-4 text-xl">{problemEvaluation.market_existence}</p>
          </div>
        )}

        {problemEvaluation.pain_points.length > 0 && (
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold">
              <FaTools className="mr-2 text-gray-600" /> Pain Points:
            </h3>

            <ul className="mt-4">
              {problemEvaluation.pain_points.map((painPoint, index) => (
                <li key={index} className="mb-2 flex items-center text-lg">
                  <FaCheckCircle className="mr-2 text-green-600" /> {painPoint}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8">
          <h3 className="mt-8 flex items-center text-xl font-semibold">
            <FaPen className="mr-2 text-blue-600" /> How You Defined The
            Problem:
          </h3>
          <p className="my-4 text-lg">
            {problem.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>

        {problemEvaluation.suggestions.length > 0 && (
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold">
              <FaLightbulb className="mr-2 text-yellow-600" /> Suggestions to
              Improve Your Problem Statement:
            </h3>

            <ul className="mt-4 list-disc pl-6">
              {problemEvaluation.suggestions.map((suggestion, index) => (
                <li key={index} className="mb-2 text-lg">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {problemEvaluation.recommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold">
              <FaExchangeAlt className="mr-2 text-purple-600" /> Alternative
              Problem Statements That Might Fit Better:
            </h3>

            <ul className="mt-4 list-disc pl-6">
              {problemEvaluation.recommendations.map(
                (recommendation, index) => (
                  <li key={index} className="mb-2 text-lg">
                    {recommendation}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </>
    )}
  </div>
)

export default ProblemEvaluationPage
