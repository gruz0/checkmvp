'use client'
import React from 'react'
import { FaLightbulb, FaMoneyBillWave, FaPen } from 'react-icons/fa'

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
    <h2 className="flex items-center text-2xl font-semibold">
      <FaMoneyBillWave className="mr-2 text-green-600" />
      <p>
        Content & Long-Term Strategy:{' '}
        {!contentAndStrategy && (
          <span className="text-gray-600">Analyzing...</span>
        )}
      </p>
    </h2>

    {contentAndStrategy && (
      <>
        <div className="mb-8">
          <h3 className="mt-8 flex items-center text-xl font-semibold">
            <FaPen className="mr-2 text-blue-600" /> Value Proposition:
          </h3>
          {contentAndStrategy.valueProposition && (
            <p className="my-4 text-lg">
              {contentAndStrategy.valueProposition}
            </p>
          )}
        </div>

        <div className="mb-8">
          <h3 className="mb-6 flex items-center text-xl font-semibold">
            <FaLightbulb className="mr-2 text-yellow-600" /> Recommended MVP
            Approach:
          </h3>

          <p className="mb-6 text-lg">
            {contentAndStrategy.mvpRecommendation.problemSolved}
          </p>

          <h4 className="mb-4 flex items-center text-lg font-semibold">
            Core Features:
          </h4>

          {contentAndStrategy.mvpRecommendation.coreFeatures.length > 0 && (
            <ul className="mb-8 list-disc pl-6">
              {contentAndStrategy.mvpRecommendation.coreFeatures.map(
                (feature, index) => (
                  <li key={index} className="mb-2 text-lg">
                    {feature}
                  </li>
                )
              )}
            </ul>
          )}

          <h4 className="mb-4 flex items-center text-lg font-semibold">
            Recommended Tools:
          </h4>

          {contentAndStrategy.mvpRecommendation.toolsRecommendation.length >
            0 && (
            <ul className="mb-8 list-disc pl-6">
              {contentAndStrategy.mvpRecommendation.toolsRecommendation.map(
                (recommendation, index) => (
                  <li key={index} className="mb-2 text-lg">
                    {recommendation}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <div className="mb-8">
          <h3 className="mb-6 flex items-center text-xl font-semibold">
            <FaLightbulb className="mr-2 text-yellow-600" /> Two-Week Testing
            Plan:
          </h3>

          {contentAndStrategy.twoWeekPlan.length > 0 && (
            <ul className="mb-8 list-disc pl-6">
              {contentAndStrategy.twoWeekPlan.map((plan, index) => (
                <li key={index} className="mb-2 text-lg">
                  <strong>{plan.dayRange}:</strong> {plan.action}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-8">
          <h3 className="mb-6 flex items-center text-xl font-semibold">
            <FaLightbulb className="mr-2 text-yellow-600" /> Estimated Costs and
            Timeline for MVP Launch:
          </h3>

          <p className="mb-6 text-lg">
            Estimated Cost:{' '}
            {contentAndStrategy.mvpCostAndTimeline.estimatedCost} | Time
            Estimate: {contentAndStrategy.mvpCostAndTimeline.timeEstimate}
          </p>

          {contentAndStrategy.twoWeekPlan.length > 0 && (
            <ul className="mb-8 list-disc pl-6">
              {contentAndStrategy.mvpCostAndTimeline.costBreakdown.map(
                (breakdown, index) => (
                  <li key={index} className="mb-2 text-lg">
                    <strong>{breakdown.item}</strong>: {breakdown.cost} (
                    {breakdown.time})
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </>
    )}
  </div>
)

export default ContentAndLongTermStrategyPage
