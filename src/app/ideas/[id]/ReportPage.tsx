'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
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
  loading: boolean
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

const reloadInterval = 5000

const ReportPage = ({ idea }: Props) => {
  const router = useRouter()

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (idea.loading) {
      intervalId = setInterval(() => {
        router.refresh()
      }, reloadInterval)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [idea.loading, router])

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">Your Idea Report</h1>

      {idea.loading && (
        <div className="mb-4 flex items-center rounded-lg border border-blue-300 bg-blue-50 p-4 text-lg md:text-xl">
          Performing analysis. It might take up to 30 seconds, please wait...
        </div>
      )}

      <hr className="my-6 md:my-8 lg:my-10" />

      <ProblemEvaluationPage
        problem={idea.problem}
        problemEvaluation={idea.problemEvaluation}
      />

      <hr className="my-6 md:my-8 lg:my-10" />

      <TargetAudienceEvaluationPage
        targetAudience={idea.targetAudience}
        targetAudienceEvaluation={idea.targetAudienceEvaluation}
      />

      <hr className="my-6 md:my-8 lg:my-10" />

      <ContentAndLongTermStrategyPage
        contentAndStrategy={idea.contentAndLongTermStrategy}
      />

      <hr className="my-6 md:my-8 lg:my-10" />

      <UserAcquisitionAndCompetitorAnalysisPage
        analysis={idea.userAcquisitionAndCompetitorAnalysis}
      />

      <hr className="my-6 md:my-8 lg:my-10" />

      <ContentStrategyAndGrowthPlanPage
        contentStrategy={idea.contentStrategyAndGrowthPlan}
      />
    </div>
  )
}

export default ReportPage
