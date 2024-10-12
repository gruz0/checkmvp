'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'
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
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-4xl font-bold">Your Personalized Report</h1>

      {idea.loading && (
        <div className="mb-4 flex items-center rounded-lg border border-blue-300 bg-blue-50 p-4 text-xl">
          <FaSpinner className="mr-2 animate-spin text-blue-500" />
          <span>
            Performing analysis. It might take up to 30 seconds, please wait...
          </span>
        </div>
      )}

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
}

export default ReportPage
