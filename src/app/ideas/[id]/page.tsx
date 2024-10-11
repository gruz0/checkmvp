import React from 'react'
import { Idea } from '@/lib/Idea'
import { IdeaService } from '@/lib/IdeaService'
import { SQLiteIdeaRepository } from '@/lib/SQLiteIdeaRepository'
import ReportPage from './ReportPage'
import type { IdeaProps } from './ReportPage'

export const dynamic = 'force-dynamic'

const repository = new SQLiteIdeaRepository()
const ideaService = new IdeaService(repository)

async function getIdea(id: string): Promise<Idea | null> {
  return await ideaService.getIdeaById(id)
}

export default async function Page({ params }: { params: { id: string } }) {
  const idea = await getIdea(params.id)

  if (!idea) {
    return <p>Idea does not exist</p>
  }

  const ideaProps: IdeaProps = {
    id: idea.getId(),
    problem: idea.getInitialProblem(),
    problemEvaluation: null,
    targetAudience: idea.getInitialTargetAudience(),
    targetAudienceEvaluation: null,
    contentAndLongTermStrategy: null,
    userAcquisitionAndCompetitorAnalysis: null,
    contentStrategyAndGrowthPlan: null,
  }

  const problemEvaluation = idea.getProblemEvaluation()

  if (problemEvaluation) {
    ideaProps.problemEvaluation = {
      status: problemEvaluation.getStatus(),
      suggestions: problemEvaluation.getSuggestions(),
      recommendations: problemEvaluation.getRecommendations(),
      pain_points: problemEvaluation.getPainPoints(),
      market_existence: problemEvaluation.getMarketExistence(),
    }
  }

  const targetAudienceEvaluation = idea.getTargetAudienceEvaluation()

  if (targetAudienceEvaluation) {
    ideaProps.targetAudienceEvaluation = {
      status: targetAudienceEvaluation.getStatus(),
      existence: targetAudienceEvaluation.getExistence(),
      suggestions: targetAudienceEvaluation.getSuggestions(),
      recommendations: targetAudienceEvaluation.getRecommendations(),
    }
  }

  const contentAndLongTermStrategyEvaluation =
    idea.getContentAndLongTermStrategyEvaluation()

  if (contentAndLongTermStrategyEvaluation) {
    ideaProps.contentAndLongTermStrategy = {
      valueProposition:
        contentAndLongTermStrategyEvaluation.getValueProposition(),
      mvpRecommendation:
        contentAndLongTermStrategyEvaluation.getMVPRecommendation(),
      twoWeekPlan: contentAndLongTermStrategyEvaluation.getTwoWeekPlan(),
      mvpCostAndTimeline:
        contentAndLongTermStrategyEvaluation.getMVPCostAndTimeline(),
    }
  }

  const userAcquisitionAndCompetitorAnalysis =
    idea.getUserAcquisitionAndCompetitorAnalysis()

  if (userAcquisitionAndCompetitorAnalysis) {
    ideaProps.userAcquisitionAndCompetitorAnalysis = {
      earlyAdoptersAcquisitionIdeas:
        userAcquisitionAndCompetitorAnalysis.getEarlyAdoptersAcquisitionIdeas(),
      competitorOverview:
        userAcquisitionAndCompetitorAnalysis.getCompetitorOverview(),
      potentialProductNames:
        userAcquisitionAndCompetitorAnalysis.getPotentialProductNames(),
      collaborationOpportunities:
        userAcquisitionAndCompetitorAnalysis.getCollaborationOpportunities(),
    }
  }

  const contentStrategyAndGrowthPlan = idea.getContentStrategyAndGrowthPlan()

  if (contentStrategyAndGrowthPlan) {
    ideaProps.contentStrategyAndGrowthPlan = {
      contentMarketingIdeas:
        contentStrategyAndGrowthPlan.getContentMarketingIdeas(),
      keyMetricsToTrackPostLaunch:
        contentStrategyAndGrowthPlan.getKeyMetricsToTrackPostLaunch(),
      recommendedToolsAndServices:
        contentStrategyAndGrowthPlan.getRecommendedToolsAndServices(),
      caseStudyOutline: contentStrategyAndGrowthPlan.getCaseStudyOutline(),
    }
  }

  return <ReportPage idea={ideaProps} />
}
