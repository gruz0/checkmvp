'use client'
import React from 'react'
import { FaSpinner, FaUserFriends } from 'react-icons/fa'
import Paragraph from './Paragraph'
import Section from './Section'
import SectionHeader from './SectionHeader'
import SimpleUnorderedList from './SimpleUnorderedList'

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
    <SectionHeader Icon={FaUserFriends} color="text-blue-600">
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
        <FaSpinner className="inline animate-spin text-blue-500" />
      )}
    </SectionHeader>

    {targetAudienceEvaluation && (
      <>
        {targetAudienceEvaluation.existence && (
          <Section>
            <Paragraph>{targetAudienceEvaluation.existence}</Paragraph>
          </Section>
        )}

        <Section header="How You Defined The Target Audience:">
          <Paragraph>
            {targetAudience.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Paragraph>
        </Section>

        {targetAudienceEvaluation.suggestions.length > 0 && (
          <Section header="Suggestions to Improve Your Target Audience:">
            <SimpleUnorderedList items={targetAudienceEvaluation.suggestions} />
          </Section>
        )}

        {targetAudienceEvaluation.recommendations.length > 0 && (
          <Section header="Alternative Target Audience Segments That Might Fit Better:">
            <ul className="space-y-6">
              {targetAudienceEvaluation.recommendations.map(
                (recommendation, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg lg:p-6"
                  >
                    <h4 className="mb-2 text-lg font-bold md:text-xl">Who?</h4>

                    <Paragraph>{recommendation.segment}</Paragraph>

                    <h4 className="mb-2 text-lg font-bold md:text-xl">Why?</h4>

                    <Paragraph>{recommendation.interaction}</Paragraph>

                    <h4 className="mb-2 text-lg font-bold md:text-xl">
                      Pain Points:
                    </h4>

                    <SimpleUnorderedList
                      items={recommendation.commonPainPoints}
                    />

                    <h4 className="mb-2 text-lg font-bold md:text-xl">
                      Targeting Strategy:
                    </h4>

                    <Paragraph>{recommendation.targetingStrategy}</Paragraph>
                  </li>
                )
              )}
            </ul>
          </Section>
        )}
      </>
    )}
  </div>
)

export default TargetAudienceEvaluationPage
