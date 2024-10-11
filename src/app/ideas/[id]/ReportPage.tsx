'use client'
import React from 'react'
import ContentAndLongTermStrategyPage from './ContentAndLongTermStrategyPage'
import ContentStrategyAndGrowthPlanPage from './ContentStrategyAndGrowthPlanPage'
import ProblemEvaluationPage from './ProblemEvaluationPage'
import TargetAudienceEvaluationPage from './TargetAudienceEvaluationPage'
import UserAcquisitionAndCompetitorAnalysisPage from './UserAcquisitionAndCompetitorAnalysisPage'
import type { ContentAndLongTermStrategyEvaluationProps } from './ContentAndLongTermStrategyPage'
import type { ContentStrategyAndGrowthPlanProps } from './ContentStrategyAndGrowthPlanPage'
import type { ProblemEvaluationProps } from './ProblemEvaluationPage'
import type { TargetAudienceEvaluationProps } from './TargetAudienceEvaluationPage'
import type { UserAcquisitionAndCompetitorAnalysisProps } from './UserAcquisitionAndCompetitorAnalysisPage'

export interface IdeaProps {
  id: string
  problem: string
  problemEvaluation: ProblemEvaluationProps | null
  targetAudience: string
  targetAudienceEvaluation: TargetAudienceEvaluationProps | null
  contentAndLongTermStrategy: ContentAndLongTermStrategyEvaluationProps | null
  userAcquisitionAndCompetitorAnalysis: UserAcquisitionAndCompetitorAnalysisProps | null
  contentStrategyAndGrowthPlan: ContentStrategyAndGrowthPlanProps | null
}

type Props = {
  idea: IdeaProps
}

const ReportPage = ({ idea }: Props) => (
  <div className="mx-auto max-w-6xl p-8">
    <h1 className="mb-6 text-4xl font-bold">Product Idea Report</h1>

    <hr className="my-8" />

    <ProblemEvaluationPage
      problem={idea.problem}
      problemEvaluation={idea.problemEvaluation}
    />

    <hr className="my-8" />

    <TargetAudienceEvaluationPage
      targetAudience={idea.targetAudience}
      targetAudienceEvaluation={idea.targetAudienceEvaluation}
    />

    <hr className="my-8" />

    <ContentAndLongTermStrategyPage
      contentAndStrategy={idea.contentAndLongTermStrategy}
    />

    <hr className="my-8" />

    <UserAcquisitionAndCompetitorAnalysisPage
      analysis={idea.userAcquisitionAndCompetitorAnalysis}
    />

    <hr className="my-8" />

    <ContentStrategyAndGrowthPlanPage
      contentStrategy={idea.contentStrategyAndGrowthPlan}
    />
  </div>
)

export default ReportPage
