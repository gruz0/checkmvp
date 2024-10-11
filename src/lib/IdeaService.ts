import { ContentAndLongTermStrategyEvaluation } from '@/lib/ContentAndLongTermStrategyEvaluation'
import { ContentStrategyAndGrowthPlan } from '@/lib/ContentStrategyAndGrowthPlan'
import { Idea } from '@/lib/Idea'
import { IdeaAIService } from '@/lib/IdeaAIService'
import { IdeaRepository } from '@/lib/IdeaRepository'
import { ProblemEvaluation } from '@/lib/ProblemEvaluation'
import { QueueService } from '@/lib/QueueService'
import { TargetAudienceEvaluation } from '@/lib/TargetAudienceEvaluation'
import type { Recommendation as TargetAudienceRecommendation } from '@/lib/TargetAudienceEvaluation'
import { UserAcquisitionAndCompetitorAnalysis } from '@/lib/UserAcquisitionAndCompetitorAnalysis'

export class IdeaService {
  private readonly repository: IdeaRepository
  private readonly queueService?: QueueService
  private readonly ideaAIService?: IdeaAIService

  constructor(
    repository: IdeaRepository,
    queueService?: QueueService,
    ideaAIService?: IdeaAIService
  ) {
    this.repository = repository
    this.queueService = queueService
    this.ideaAIService = ideaAIService
  }

  async createIdea(
    initialProblem: string,
    initialTargetAudience: string
  ): Promise<Idea> {
    const idea = Idea.New(initialProblem.trim(), initialTargetAudience.trim())

    await this.saveIdea(idea)

    return idea
  }

  async getIdeaById(id: string): Promise<Idea | null> {
    return await this.repository.findById(id)
  }

  async getAllIdeas(): Promise<Idea[]> {
    return await this.repository.findAll()
  }

  async evaluateIdeaAndTargetAudience(id: string): Promise<void> {
    if (!this.ideaAIService) {
      throw new Error('IdeaAIService is not defined')
    }

    const idea = await this.repository.findById(id)

    if (!idea) {
      throw new Error(`Idea ${id} does not exist`)
    }

    const evaluation = await this.ideaAIService.evaluateIdea(
      idea.getInitialProblem(),
      idea.getInitialTargetAudience()
    )

    const problemEvaluation = ProblemEvaluation.New(
      evaluation.problem_evaluation.status,
      evaluation.problem_evaluation.suggestions,
      evaluation.problem_evaluation.recommendations,
      evaluation.problem_evaluation.pain_points,
      evaluation.problem_evaluation.market_existence
    )

    const recommendations: TargetAudienceRecommendation[] =
      evaluation.target_audience.recommendations.map((recommendation) => ({
        segment: recommendation.segment,
        commonPainPoints: recommendation.common_pain_points,
        interaction: recommendation.interaction,
        targetingStrategy: recommendation.targeting_strategy,
      }))

    const targetAudienceEvaluation = TargetAudienceEvaluation.New(
      evaluation.target_audience.status,
      evaluation.target_audience.existence,
      evaluation.target_audience.suggestions,
      recommendations
    )

    idea.evaluateProblemAndTargetAudience(
      problemEvaluation,
      targetAudienceEvaluation
    )

    await this.saveIdea(idea)
  }

  async evaluateContentAndLongTermStrategy(id: string): Promise<void> {
    if (!this.ideaAIService) {
      throw new Error('IdeaAIService is not defined')
    }

    const idea = await this.repository.findById(id)

    if (!idea) {
      throw new Error(`Idea ${id} does not exist`)
    }

    const evaluation =
      await this.ideaAIService.evaluateContentAndLongTermStrategy(
        idea.getInitialProblem(),
        idea.getInitialTargetAudience()
      )

    const contentAndStrategyEvaluation =
      ContentAndLongTermStrategyEvaluation.New(
        evaluation.valueProposition,
        evaluation.mvpRecommendation,
        evaluation.twoWeekPlan,
        evaluation.mvpCostAndTimeline
      )

    idea.evaluateContentAndLongTermStrategy(contentAndStrategyEvaluation)

    await this.saveIdea(idea)
  }

  async evaluateUserAcquisitionAndCompetitorAnalysis(
    id: string
  ): Promise<void> {
    if (!this.ideaAIService) {
      throw new Error('IdeaAIService is not defined')
    }

    const idea = await this.repository.findById(id)

    if (!idea) {
      throw new Error(`Idea ${id} does not exist`)
    }

    const evaluation =
      await this.ideaAIService.evaluateUserAcquisitionAndCompetitorAnalysis(
        idea.getInitialProblem(),
        idea.getInitialTargetAudience()
      )

    const userAcquisitionAndCompetitorAnalysis =
      UserAcquisitionAndCompetitorAnalysis.New(
        evaluation.earlyAdoptersAcquisitionIdeas,
        evaluation.competitorOverview,
        evaluation.potentialProductNames,
        evaluation.collaborationOpportunities
      )

    idea.evaluateUserAcquisitionAndCompetitorAnalysis(
      userAcquisitionAndCompetitorAnalysis
    )

    await this.saveIdea(idea)
  }

  async evaluateContentStrategyAndGrowthPlan(id: string): Promise<void> {
    if (!this.ideaAIService) {
      throw new Error('IdeaAIService is not defined')
    }

    const idea = await this.repository.findById(id)

    if (!idea) {
      throw new Error(`Idea ${id} does not exist`)
    }

    const evaluation =
      await this.ideaAIService.evaluateContentStrategyAndGrowthPlan(
        idea.getInitialProblem(),
        idea.getInitialTargetAudience()
      )

    const contentStrategyAndGrowthPlan = ContentStrategyAndGrowthPlan.New(
      evaluation.contentMarketingIdeas,
      evaluation.keyMetricsToTrackPostLaunch,
      evaluation.recommendedToolsAndServices,
      evaluation.caseStudyOutline
    )

    idea.evaluateContentStrategyAndGrowthPlan(contentStrategyAndGrowthPlan)

    await this.saveIdea(idea)
  }

  async saveIdea(idea: Idea): Promise<void> {
    await this.repository.save(idea)

    await this.handleDomainEvents(idea)
  }

  private async handleDomainEvents(idea: Idea): Promise<void> {
    for (const event of idea.getDomainEvents()) {
      console.log(
        `Handling event: ${event.getEventName()} at ${event.occurredAt}`
      )

      switch (event.getEventName()) {
        case 'IdeaCreated': {
          await Promise.all([
            this.enqueueIdeaAndTargetAudienceEvaluation(idea.getId()),
            this.enqueueIdeaContentAndStrategyGeneration(idea.getId()),
            this.enqueueUserAcquisitionAndCompetitorAnalysis(idea.getId()),
            this.enqueueContentStrategyAndGrowthPlan(idea.getId()),
          ])

          break
        }
        default:
          console.error(
            `IdeaService: Unsupported event: ${event.getEventName()}`
          )
      }
    }

    // Clear the domain events after handling them
    idea.clearDomainEvents()
  }

  private async enqueueIdeaAndTargetAudienceEvaluation(
    ideaId: string
  ): Promise<void> {
    if (!this.queueService) {
      throw new Error('QueueService is not defined')
    }

    try {
      await this.queueService.addJob('evaluateIdeaAndTargetAudience', {
        ideaId,
      })
    } catch (e) {
      // TODO: Implement outbox pattern
      console.error('Unable to enqueue task: ', e)
    }
  }

  private async enqueueIdeaContentAndStrategyGeneration(
    ideaId: string
  ): Promise<void> {
    if (!this.queueService) {
      throw new Error('QueueService is not defined')
    }

    try {
      await this.queueService.addJob('generateIdeaContentAndStrategy', {
        ideaId,
      })
    } catch (e) {
      // TODO: Implement outbox pattern
      console.error('Unable to enqueue task: ', e)

      throw e
    }
  }

  private async enqueueUserAcquisitionAndCompetitorAnalysis(
    ideaId: string
  ): Promise<void> {
    if (!this.queueService) {
      throw new Error('QueueService is not defined')
    }

    try {
      await this.queueService.addJob(
        'generateUserAcquisitionAndCompetitorAnalysis',
        {
          ideaId,
        }
      )
    } catch (e) {
      // TODO: Implement outbox pattern
      console.error('Unable to enqueue task: ', e)

      throw e
    }
  }

  private async enqueueContentStrategyAndGrowthPlan(
    ideaId: string
  ): Promise<void> {
    if (!this.queueService) {
      throw new Error('QueueService is not defined')
    }

    try {
      await this.queueService.addJob('generateContentStrategyAndGrowthPlan', {
        ideaId,
      })
    } catch (e) {
      // TODO: Implement outbox pattern
      console.error('Unable to enqueue task: ', e)

      throw e
    }
  }
}
