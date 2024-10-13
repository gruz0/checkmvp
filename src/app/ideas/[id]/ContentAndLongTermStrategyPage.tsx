'use client'
import React from 'react'
import { FaMoneyBillWave, FaSpinner } from 'react-icons/fa'
import Paragraph from './Paragraph'
import Section from './Section'
import SectionHeader from './SectionHeader'
import SimpleUnorderedList from './SimpleUnorderedList'

type CostBreakdown = {
  item: string
  cost: string
  time: string
}

type MVPRecommendation = {
  coreFeatures: string[]
  problemSolved: string
  toolsRecommendation: string[]
}

type TwoWeekPlan = {
  dayRange: string
  action: string
}

type MVPCostAndTimeline = {
  estimatedCost: string
  timeEstimate: string
  costBreakdown: CostBreakdown[]
}

export interface ContentAndLongTermStrategyEvaluationProps {
  valueProposition: string
  mvpRecommendation: MVPRecommendation
  twoWeekPlan: TwoWeekPlan[]
  mvpCostAndTimeline: MVPCostAndTimeline
}

type Props = {
  contentAndStrategy: ContentAndLongTermStrategyEvaluationProps | null
}

const ContentAndLongTermStrategyPage = ({ contentAndStrategy }: Props) => (
  <div>
    <SectionHeader Icon={FaMoneyBillWave} color="text-green-600">
      Content & Long-Term Strategy:{' '}
      {!contentAndStrategy && (
        <FaSpinner className="inline animate-spin text-blue-500" />
      )}
    </SectionHeader>

    {contentAndStrategy && (
      <>
        <Section header="Value Proposition:">
          <Paragraph>{contentAndStrategy.valueProposition}</Paragraph>
        </Section>

        <Section header="Recommended MVP Approach:">
          <Paragraph>
            {contentAndStrategy.mvpRecommendation.problemSolved}
          </Paragraph>

          <h4 className="mb-4 text-lg font-semibold md:text-xl">
            Core Features:
          </h4>

          {contentAndStrategy.mvpRecommendation.coreFeatures.length > 0 && (
            <SimpleUnorderedList
              items={contentAndStrategy.mvpRecommendation.coreFeatures}
            />
          )}

          <h4 className="mb-4 text-lg font-semibold md:text-xl">
            Recommended Tools:
          </h4>

          {contentAndStrategy.mvpRecommendation.toolsRecommendation.length >
            0 && (
            <SimpleUnorderedList
              items={contentAndStrategy.mvpRecommendation.toolsRecommendation}
            />
          )}
        </Section>

        <Section header="Two-Week Testing Plan:">
          {contentAndStrategy.twoWeekPlan.length > 0 && (
            <ul className="mb-6 list-disc pl-4">
              {contentAndStrategy.twoWeekPlan.map((plan, index) => (
                <li key={index} className="mb-2 pl-2 text-lg">
                  <strong>{plan.dayRange}:</strong> {plan.action}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section header="Estimated Costs and Timeline for MVP Launch:">
          <Paragraph>
            Estimated Cost:{' '}
            {contentAndStrategy.mvpCostAndTimeline.estimatedCost}
            <br />
            Time Estimate: {contentAndStrategy.mvpCostAndTimeline.timeEstimate}
          </Paragraph>

          {contentAndStrategy.twoWeekPlan.length > 0 && (
            <ul className="mb-6 list-disc pl-4">
              {contentAndStrategy.mvpCostAndTimeline.costBreakdown.map(
                (breakdown, index) => (
                  <li key={index} className="mb-2 pl-2 text-lg">
                    <strong>{breakdown.item}</strong>: {breakdown.cost} (
                    {breakdown.time})
                  </li>
                )
              )}
            </ul>
          )}
        </Section>
      </>
    )}
  </div>
)

export default ContentAndLongTermStrategyPage
