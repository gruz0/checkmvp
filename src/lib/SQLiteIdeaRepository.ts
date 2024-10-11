import { ContentAndLongTermStrategyEvaluation } from '@/lib/ContentAndLongTermStrategyEvaluation'
import { ContentStrategyAndGrowthPlan } from '@/lib/ContentStrategyAndGrowthPlan'
import { Idea } from '@/lib/Idea'
import { IdeaRepository } from '@/lib/IdeaRepository'
import { ProblemEvaluation } from '@/lib/ProblemEvaluation'
import type { Status as ProblemEvaluationStatus } from '@/lib/ProblemEvaluation'
import { TargetAudienceEvaluation } from '@/lib/TargetAudienceEvaluation'
import type { Status as TargetAudienceEvaluationStatus } from '@/lib/TargetAudienceEvaluation'
import { UserAcquisitionAndCompetitorAnalysis } from '@/lib/UserAcquisitionAndCompetitorAnalysis'
import { prisma } from '@/lib/prisma'
import type { PrismaClient } from '@prisma/client/extension'

export class SQLiteIdeaRepository implements IdeaRepository {
  async save(idea: Idea): Promise<void> {
    await prisma.$transaction(async (prisma: PrismaClient) => {
      await prisma.idea.upsert({
        where: { id: idea.getId() },
        update: {
          initialProblem: idea.getInitialProblem(),
          initialTargetAudience: idea.getInitialTargetAudience(),
        },
        create: {
          id: idea.getId(),
          initialProblem: idea.getInitialProblem(),
          initialTargetAudience: idea.getInitialTargetAudience(),
        },
      })

      const problemEvaluation = idea.getProblemEvaluation()

      if (!problemEvaluation) {
        await prisma.problemEvaluation.deleteMany({
          where: { ideaId: idea.getId() },
        })
      } else {
        await prisma.problemEvaluation.upsert({
          where: { ideaId: idea.getId() },
          update: {
            status: problemEvaluation.getStatus(),
            suggestions: JSON.stringify(problemEvaluation.getSuggestions()),
            recommendations: JSON.stringify(
              problemEvaluation.getRecommendations()
            ),
            painPoints: JSON.stringify(problemEvaluation.getPainPoints()),
            marketExistence: problemEvaluation.getMarketExistence(),
          },
          create: {
            ideaId: idea.getId(),
            status: problemEvaluation.getStatus(),
            suggestions: JSON.stringify(problemEvaluation.getSuggestions()),
            recommendations: JSON.stringify(
              problemEvaluation.getRecommendations()
            ),
            painPoints: JSON.stringify(problemEvaluation.getPainPoints()),
            marketExistence: problemEvaluation.getMarketExistence(),
          },
        })
      }

      const targetAudienceEvaluation = idea.getTargetAudienceEvaluation()

      if (!targetAudienceEvaluation) {
        await prisma.targetAudienceEvaluation.deleteMany({
          where: { ideaId: idea.getId() },
        })
      } else {
        await prisma.targetAudienceEvaluation.upsert({
          where: { ideaId: idea.getId() },
          update: {
            status: targetAudienceEvaluation.getStatus(),
            existence: targetAudienceEvaluation.getExistence(),
            suggestions: JSON.stringify(
              targetAudienceEvaluation.getSuggestions()
            ),
            recommendations: JSON.stringify(
              targetAudienceEvaluation.getRecommendations()
            ),
          },
          create: {
            ideaId: idea.getId(),
            status: targetAudienceEvaluation.getStatus(),
            existence: targetAudienceEvaluation.getExistence(),
            suggestions: JSON.stringify(
              targetAudienceEvaluation.getSuggestions()
            ),
            recommendations: JSON.stringify(
              targetAudienceEvaluation.getRecommendations()
            ),
          },
        })
      }

      const contentAndLongTermStrategyEvaluation =
        idea.getContentAndLongTermStrategyEvaluation()

      if (!contentAndLongTermStrategyEvaluation) {
        await prisma.contentAndLongTermStrategyEvaluation.deleteMany({
          where: { ideaId: idea.getId() },
        })
      } else {
        await prisma.contentAndLongTermStrategyEvaluation.upsert({
          where: { ideaId: idea.getId() },
          update: {
            valueProposition:
              contentAndLongTermStrategyEvaluation.getValueProposition(),
            mvpRecommendation: JSON.stringify(
              contentAndLongTermStrategyEvaluation.getMVPRecommendation()
            ),
            twoWeekPlan: JSON.stringify(
              contentAndLongTermStrategyEvaluation.getTwoWeekPlan()
            ),
            mvpCostAndTimeline: JSON.stringify(
              contentAndLongTermStrategyEvaluation.getMVPCostAndTimeline()
            ),
          },
          create: {
            ideaId: idea.getId(),
            valueProposition:
              contentAndLongTermStrategyEvaluation.getValueProposition(),
            mvpRecommendation: JSON.stringify(
              contentAndLongTermStrategyEvaluation.getMVPRecommendation()
            ),
            twoWeekPlan: JSON.stringify(
              contentAndLongTermStrategyEvaluation.getTwoWeekPlan()
            ),
            mvpCostAndTimeline: JSON.stringify(
              contentAndLongTermStrategyEvaluation.getMVPCostAndTimeline()
            ),
          },
        })
      }

      const userAcquisitionAndCompetitorAnalysis =
        idea.getUserAcquisitionAndCompetitorAnalysis()

      if (!userAcquisitionAndCompetitorAnalysis) {
        await prisma.userAcquisitionAndCompetitorAnalysis.deleteMany({
          where: { ideaId: idea.getId() },
        })
      } else {
        await prisma.userAcquisitionAndCompetitorAnalysis.upsert({
          where: { ideaId: idea.getId() },
          update: {
            earlyAdoptersAcquisitionIdeas: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getEarlyAdoptersAcquisitionIdeas()
            ),
            competitorOverview: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getCompetitorOverview()
            ),
            potentialProductNames: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getPotentialProductNames()
            ),
            collaborationOpportunities: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getCollaborationOpportunities()
            ),
          },
          create: {
            ideaId: idea.getId(),
            earlyAdoptersAcquisitionIdeas: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getEarlyAdoptersAcquisitionIdeas()
            ),
            competitorOverview: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getCompetitorOverview()
            ),
            potentialProductNames: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getPotentialProductNames()
            ),
            collaborationOpportunities: JSON.stringify(
              userAcquisitionAndCompetitorAnalysis.getCollaborationOpportunities()
            ),
          },
        })
      }

      const contentStrategyAndGrowthPlan =
        idea.getContentStrategyAndGrowthPlan()

      if (!contentStrategyAndGrowthPlan) {
        await prisma.contentStrategyAndGrowthPlan.deleteMany({
          where: { ideaId: idea.getId() },
        })
      } else {
        await prisma.contentStrategyAndGrowthPlan.upsert({
          where: { ideaId: idea.getId() },
          update: {
            contentMarketingIdeas: JSON.stringify(
              contentStrategyAndGrowthPlan.getContentMarketingIdeas()
            ),
            keyMetricsToTrackPostLaunch: JSON.stringify(
              contentStrategyAndGrowthPlan.getKeyMetricsToTrackPostLaunch()
            ),
            recommendedToolsAndServices: JSON.stringify(
              contentStrategyAndGrowthPlan.getRecommendedToolsAndServices()
            ),
            caseStudyOutline: JSON.stringify(
              contentStrategyAndGrowthPlan.getCaseStudyOutline()
            ),
          },
          create: {
            ideaId: idea.getId(),
            contentMarketingIdeas: JSON.stringify(
              contentStrategyAndGrowthPlan.getContentMarketingIdeas()
            ),
            keyMetricsToTrackPostLaunch: JSON.stringify(
              contentStrategyAndGrowthPlan.getKeyMetricsToTrackPostLaunch()
            ),
            recommendedToolsAndServices: JSON.stringify(
              contentStrategyAndGrowthPlan.getRecommendedToolsAndServices()
            ),
            caseStudyOutline: JSON.stringify(
              contentStrategyAndGrowthPlan.getCaseStudyOutline()
            ),
          },
        })
      }
    })
  }

  async findById(id: string): Promise<Idea | null> {
    const ideaModel = await prisma.idea.findUnique({
      where: { id },
      include: {
        problemEvaluation: true,
        targetAudienceEvaluation: true,
        contentAndStrategyEvaluation: true,
        userAcquisitionAndCompetitorAnalysis: true,
        contentStrategyAndGrowthPlan: true,
      },
    })

    if (!ideaModel) {
      return null
    }

    const problemEvaluation = ideaModel.problemEvaluation
      ? ProblemEvaluation.New(
          ideaModel.problemEvaluation.status as ProblemEvaluationStatus,
          JSON.parse(ideaModel.problemEvaluation.suggestions),
          JSON.parse(ideaModel.problemEvaluation.recommendations),
          JSON.parse(ideaModel.problemEvaluation.painPoints),
          ideaModel.problemEvaluation.marketExistence
        )
      : null

    const targetAudienceEvaluation = ideaModel.targetAudienceEvaluation
      ? TargetAudienceEvaluation.New(
          ideaModel.targetAudienceEvaluation
            .status as TargetAudienceEvaluationStatus,
          ideaModel.targetAudienceEvaluation.existence,
          JSON.parse(ideaModel.targetAudienceEvaluation.suggestions),
          JSON.parse(ideaModel.targetAudienceEvaluation.recommendations)
        )
      : null

    const contentAndStrategyEvaluation = ideaModel.contentAndStrategyEvaluation
      ? ContentAndLongTermStrategyEvaluation.New(
          ideaModel.contentAndStrategyEvaluation.valueProposition,
          JSON.parse(ideaModel.contentAndStrategyEvaluation.mvpRecommendation),
          JSON.parse(ideaModel.contentAndStrategyEvaluation.twoWeekPlan),
          JSON.parse(ideaModel.contentAndStrategyEvaluation.mvpCostAndTimeline)
        )
      : null

    const userAcquisitionAndCompetitorAnalysis =
      ideaModel.userAcquisitionAndCompetitorAnalysis
        ? UserAcquisitionAndCompetitorAnalysis.New(
            JSON.parse(
              ideaModel.userAcquisitionAndCompetitorAnalysis
                .earlyAdoptersAcquisitionIdeas
            ),
            JSON.parse(
              ideaModel.userAcquisitionAndCompetitorAnalysis.competitorOverview
            ),
            JSON.parse(
              ideaModel.userAcquisitionAndCompetitorAnalysis
                .potentialProductNames
            ),
            JSON.parse(
              ideaModel.userAcquisitionAndCompetitorAnalysis
                .collaborationOpportunities
            )
          )
        : null

    const contentStrategyAndGrowthPlan = ideaModel.contentStrategyAndGrowthPlan
      ? ContentStrategyAndGrowthPlan.New(
          JSON.parse(
            ideaModel.contentStrategyAndGrowthPlan.contentMarketingIdeas
          ),
          JSON.parse(
            ideaModel.contentStrategyAndGrowthPlan.keyMetricsToTrackPostLaunch
          ),
          JSON.parse(
            ideaModel.contentStrategyAndGrowthPlan.recommendedToolsAndServices
          ),
          JSON.parse(ideaModel.contentStrategyAndGrowthPlan.caseStudyOutline)
        )
      : null

    return Idea.New(
      ideaModel.initialProblem,
      ideaModel.initialTargetAudience,
      ideaModel.id,
      problemEvaluation,
      targetAudienceEvaluation,
      contentAndStrategyEvaluation,
      userAcquisitionAndCompetitorAnalysis,
      contentStrategyAndGrowthPlan
    )
  }

  async findAll(): Promise<Idea[]> {
    const ideaModels = await prisma.idea.findMany({
      include: {
        problemEvaluation: true,
        targetAudienceEvaluation: true,
        contentAndStrategyEvaluation: true,
        userAcquisitionAndCompetitorAnalysis: true,
        contentStrategyAndGrowthPlan: true,
      },
    })

    return ideaModels.map((ideaModel) => {
      const problemEvaluation = ideaModel.problemEvaluation
        ? ProblemEvaluation.New(
            ideaModel.problemEvaluation.status as ProblemEvaluationStatus,
            JSON.parse(ideaModel.problemEvaluation.suggestions),
            JSON.parse(ideaModel.problemEvaluation.recommendations),
            JSON.parse(ideaModel.problemEvaluation.painPoints),
            ideaModel.problemEvaluation.marketExistence
          )
        : null

      const targetAudienceEvaluation = ideaModel.targetAudienceEvaluation
        ? TargetAudienceEvaluation.New(
            ideaModel.targetAudienceEvaluation
              .status as TargetAudienceEvaluationStatus,
            ideaModel.targetAudienceEvaluation.existence,
            JSON.parse(ideaModel.targetAudienceEvaluation.suggestions),
            JSON.parse(ideaModel.targetAudienceEvaluation.recommendations)
          )
        : null

      const contentAndStrategyEvaluation =
        ideaModel.contentAndStrategyEvaluation
          ? ContentAndLongTermStrategyEvaluation.New(
              ideaModel.contentAndStrategyEvaluation.valueProposition,
              JSON.parse(
                ideaModel.contentAndStrategyEvaluation.mvpRecommendation
              ),
              JSON.parse(ideaModel.contentAndStrategyEvaluation.twoWeekPlan),
              JSON.parse(
                ideaModel.contentAndStrategyEvaluation.mvpCostAndTimeline
              )
            )
          : null

      const userAcquisitionAndCompetitorAnalysis =
        ideaModel.userAcquisitionAndCompetitorAnalysis
          ? UserAcquisitionAndCompetitorAnalysis.New(
              JSON.parse(
                ideaModel.userAcquisitionAndCompetitorAnalysis
                  .earlyAdoptersAcquisitionIdeas
              ),
              JSON.parse(
                ideaModel.userAcquisitionAndCompetitorAnalysis
                  .competitorOverview
              ),
              JSON.parse(
                ideaModel.userAcquisitionAndCompetitorAnalysis
                  .potentialProductNames
              ),
              JSON.parse(
                ideaModel.userAcquisitionAndCompetitorAnalysis
                  .collaborationOpportunities
              )
            )
          : null

      const contentStrategyAndGrowthPlan =
        ideaModel.contentStrategyAndGrowthPlan
          ? ContentStrategyAndGrowthPlan.New(
              JSON.parse(
                ideaModel.contentStrategyAndGrowthPlan.contentMarketingIdeas
              ),
              JSON.parse(
                ideaModel.contentStrategyAndGrowthPlan
                  .keyMetricsToTrackPostLaunch
              ),
              JSON.parse(
                ideaModel.contentStrategyAndGrowthPlan
                  .recommendedToolsAndServices
              ),
              JSON.parse(
                ideaModel.contentStrategyAndGrowthPlan.caseStudyOutline
              )
            )
          : null

      return Idea.New(
        ideaModel.initialProblem,
        ideaModel.initialTargetAudience,
        ideaModel.id,
        problemEvaluation,
        targetAudienceEvaluation,
        contentAndStrategyEvaluation,
        userAcquisitionAndCompetitorAnalysis,
        contentStrategyAndGrowthPlan
      )
    })
  }
}
