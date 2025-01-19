import * as Sentry from '@sentry/nextjs'
import { NotFoundError } from '@/common/errors/NotFoundError'
import { Idea } from '@/idea/domain/Aggregate'

type Query = {
  id: string
}

interface FullIdeaDTO {
  id: string
  problem: string
  marketExistence: string
  valueProposition: {
    mainBenefit: string
    problemSolving: string
    differentiation: string
  } | null
  targetAudiences: Array<{
    id: string
    segment: string
    description: string
    why: string | null
    painPoints: string[] | null
    targetingStrategy: string | null
  }>
  marketAnalysis: {
    trends: string
    userBehaviors: string
    marketGaps: string
    innovationOpportunities: string
    strategicDirection: string
  } | null
  competitorAnalysis: {
    competitors: Array<{
      name: string
      productName: string
      url: string
      coreFeatures: string[]
      valueProposition: string
      userAcquisition: string
      strengths: string[]
      weaknesses: string[]
      differentiationOpportunity: string
    }>
    comparison: {
      strengths: string[]
      weaknesses: string[]
    }
    differentiationSuggestions: string[]
  } | null
  productNames: Array<{
    productName: string
    domains: string[]
    why: string
    tagline: string
    targetAudienceInsight: string
    similarNames: string[]
    brandingPotential: string
  }> | null
  swotAnalysis: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  } | null
  elevatorPitches: Array<{
    hook: string
    problem: string
    solution: string
    valueProposition: string
    cta: string
  }> | null
  googleTrendsKeywords: Array<string> | null
  contentIdeasForMarketing: Record<string, ContentIdeaDTO> | null
  testingPlan: {
    coreAssumptions: Array<{
      assumption: string
      whyCritical: string
      validationMethod: string
    }>
    twoWeekPlan: Array<{
      day: number
      focus: string
      tasks: string[]
      successMetrics: string[]
      toolsNeeded: string[]
      estimatedTime: string
    }>
    keyMetrics: {
      qualitative: string[]
      quantitative: string[]
      minimumSuccessCriteria: string[]
    }
    testingMethods: Array<{
      method: string
      description: string
      whenToUse: string
      expectedOutcome: string
    }>
    contingencyPlans: Array<{
      scenario: string
      solution: string
      alternativeApproach: string
    }>
    resourceOptimization: {
      minimumBudget: string
      timeSavingTips: string[]
      freeTools: string[]
      paidAlternatives: string[]
    }
    softLaunchStrategy: {
      platforms: string[]
      preparationSteps: string[]
      timing: string
      engagementTactics: string[]
      contentTemplates: {
        titles: string[]
        shortDescription: string
        problemStatement: string
        solutionPreview: string
        callToAction: {
          primary: string
          secondary: string
          valueHook: string
        }
        keyBenefits: string[]
        socialProofPlan: string[]
        engagementHooks: string[]
      }
      platformSpecific: Array<{
        platform: string
        contentFormat: string
        bestTiming: string
        communityRules: string[]
        engagementStrategy: string
      }>
    }
  } | null
}

interface ContentIdeaDTO {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

interface ReadModel {
  getById(id: string): Promise<Idea | null>
}

export class GetIdeaHandler {
  constructor(private readonly readModel: ReadModel) {}

  async handle(query: Query): Promise<FullIdeaDTO> {
    Sentry.setTag('component', 'Query')
    Sentry.setTag('query_type', 'GetIdea')
    Sentry.setTag('idea_id', query.id)

    const idea = await this.readModel.getById(query.id)

    if (!idea) {
      throw new NotFoundError(`Idea ${query.id} does not exist`)
    }

    const valueProposition = idea.getValueProposition()
    const targetAudiences = idea.getTargetAudiences()
    const marketAnalysis = idea.getMarketAnalysis()
    const competitorAnalysis = idea.getCompetitorAnalysis()
    const productNames = idea.getProductNames()
    const swotAnalysis = idea.getSWOTAnalysis()
    const elevatorPitches = idea.getElevatorPitches()
    const googleTrendsKeywords = idea.getGoogleTrendsKeywords()
    const contentIdeasForMarketing = idea.getContentIdeasForMarketing()
    const testingPlan = idea.getTestingPlan()

    return {
      id: idea.getId().getValue(),
      problem: idea.getProblem().getValue(),
      marketExistence: idea.getMarketExistence(),
      valueProposition: valueProposition
        ? {
            mainBenefit: valueProposition.getMainBenefit(),
            problemSolving: valueProposition.getProblemSolving(),
            differentiation: valueProposition.getDifferentiation(),
          }
        : null,
      targetAudiences: targetAudiences.map((audience) => ({
        id: audience.getId().getValue(),
        segment: audience.getSegment(),
        description: audience.getDescription(),
        why: audience.getWhy(),
        painPoints: audience.getPainPoints(),
        targetingStrategy: audience.getTargetingStrategy(),
      })),
      marketAnalysis: marketAnalysis
        ? {
            trends: marketAnalysis.getTrends(),
            userBehaviors: marketAnalysis.getUserBehaviors(),
            marketGaps: marketAnalysis.getMarketGaps(),
            innovationOpportunities:
              marketAnalysis.getInnovationOpportunities(),
            strategicDirection: marketAnalysis.getStrategicDirection(),
          }
        : null,
      competitorAnalysis: competitorAnalysis
        ? {
            competitors: competitorAnalysis
              .getCompetitors()
              .map((competitor) => ({
                name: competitor.getName(),
                productName: competitor.getProductName(),
                url: competitor.getUrl(),
                coreFeatures: competitor.getCoreFeatures(),
                valueProposition: competitor.getValueProposition(),
                userAcquisition: competitor.getUserAcquisition(),
                strengths: competitor.getStrengths(),
                weaknesses: competitor.getWeaknesses(),
                differentiationOpportunity:
                  competitor.getDifferentiationOpportunity(),
              })),
            comparison: competitorAnalysis.getComparison(),
            differentiationSuggestions:
              competitorAnalysis.getDifferentiationSuggestions(),
          }
        : null,
      productNames: productNames
        ? productNames.map((product) => ({
            productName: product.getProductName(),
            domains: product.getDomains(),
            why: product.getWhy(),
            tagline: product.getTagline(),
            targetAudienceInsight: product.getTargetAudienceInsight(),
            similarNames: product.getSimilarNames(),
            brandingPotential: product.getBrandingPotential(),
          }))
        : null,
      swotAnalysis: swotAnalysis
        ? {
            strengths: swotAnalysis.getStrengths(),
            weaknesses: swotAnalysis.getWeaknesses(),
            opportunities: swotAnalysis.getOpportunities(),
            threats: swotAnalysis.getThreats(),
          }
        : null,
      elevatorPitches: elevatorPitches
        ? elevatorPitches.map((pitch) => ({
            hook: pitch.getHook(),
            problem: pitch.getProblem(),
            solution: pitch.getSolution(),
            valueProposition: pitch.getValueProposition(),
            cta: pitch.getCTA(),
          }))
        : null,
      googleTrendsKeywords: googleTrendsKeywords
        ? googleTrendsKeywords.map((keyword) => keyword.getKeyword())
        : null,
      contentIdeasForMarketing: contentIdeasForMarketing
        ? contentIdeasForMarketing.getContentIdeas().reduce(
            (acc, contentIdea) => {
              const section = contentIdea.getStrategy().getName()

              acc[section] = {
                platforms: contentIdea.getPlatforms(),
                ideas: contentIdea.getIdeas(),
                benefits: contentIdea.getBenefits(),
              }

              return acc
            },
            {} as Record<string, ContentIdeaDTO>
          )
        : null,
      testingPlan: testingPlan
        ? {
            coreAssumptions: testingPlan.getCoreAssumptions(),
            twoWeekPlan: testingPlan.getTwoWeekPlan(),
            keyMetrics: testingPlan.getKeyMetrics(),
            testingMethods: testingPlan.getTestingMethods(),
            contingencyPlans: testingPlan.getContingencyPlans(),
            resourceOptimization: testingPlan.getResourceOptimization(),
            softLaunchStrategy: testingPlan.getSoftLaunchStrategy(),
          }
        : null,
    }
  }
}
