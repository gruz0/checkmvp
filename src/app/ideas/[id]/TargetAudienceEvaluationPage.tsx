'use client'
import React from 'react'
import {
  FaExchangeAlt,
  FaLightbulb,
  FaPen,
  FaUserFriends,
} from 'react-icons/fa'

interface TargetAudienceSegment {
  segment: string
  commonPainPoints: string[]
  interaction: string
  targetingStrategy: string
}

export interface TargetAudienceEvaluationProps {
  status: 'well-defined' | 'requires_changes' | 'not-well-defined'
  existence: string
  suggestions: string[]
  recommendations: TargetAudienceSegment[]
}

type Props = {
  targetAudience: string
  targetAudienceEvaluation: TargetAudienceEvaluationProps | null
}

const TargetAudienceEvaluationPage = ({
  targetAudience,
  targetAudienceEvaluation,
}: Props) => (
  <div>
    <h2 className="flex items-center text-2xl font-semibold">
      <FaUserFriends className="mr-2 text-blue-600" />
      <p>
        Target Audience Evaluation:{' '}
        {targetAudienceEvaluation ? (
          <span
            className={
              targetAudienceEvaluation.status === 'well-defined'
                ? 'text-green-600'
                : targetAudienceEvaluation.status === 'requires_changes'
                  ? 'text-orange-600'
                  : 'text-red-600'
            }
          >
            {targetAudienceEvaluation.status === 'well-defined'
              ? 'Well-defined'
              : targetAudienceEvaluation.status === 'requires_changes'
                ? 'Requires changes'
                : 'Not well-defined'}
          </span>
        ) : (
          <span className="text-gray-600">Analyzing...</span>
        )}
      </p>
    </h2>

    {targetAudienceEvaluation && (
      <>
        {targetAudienceEvaluation.existence && (
          <div className="mb-8">
            <p className="mt-4 text-xl">{targetAudienceEvaluation.existence}</p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="mt-8 flex items-center text-xl font-semibold">
            <FaPen className="mr-2 text-blue-600" /> How You Defined The Target
            Audience:
          </h3>
          <p className="my-4 text-lg">
            {targetAudience.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>

        {targetAudienceEvaluation.suggestions.length > 0 && (
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold">
              <FaLightbulb className="mr-2 text-yellow-600" /> Suggestions to
              Improve Your Target Audience:
            </h3>

            <ul className="mt-4 list-disc pl-6">
              {targetAudienceEvaluation.suggestions.map((suggestion, index) => (
                <li key={index} className="mb-2 text-lg">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {targetAudienceEvaluation.recommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold">
              <FaExchangeAlt className="mr-2 text-purple-600" /> Alternative
              Target Audience Segments That Might Fit Better:
            </h3>

            <ul className="mt-6 space-y-6">
              {targetAudienceEvaluation.recommendations.map(
                (recommendation, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
                  >
                    <div className="mb-6">
                      <p className="text-xl text-gray-800">
                        {recommendation.segment}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h4 className="mb-2 text-xl font-bold">Why?</h4>
                      <p className="text-lg text-gray-800">
                        {recommendation.interaction}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h4 className="mb-2 text-xl font-bold">Pain Points:</h4>
                      <ul className="list-disc space-y-1 pl-4 text-gray-800">
                        {recommendation.commonPainPoints.map((painPoint, i) => (
                          <li key={i} className="text-lg">
                            {painPoint}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h4 className="mb-2 text-xl font-bold">
                        Targeting Strategy:
                      </h4>
                      <p className="text-lg text-gray-800">
                        {recommendation.targetingStrategy}
                      </p>
                    </div>
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

export default TargetAudienceEvaluationPage
