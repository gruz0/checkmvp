interface ProblemEvaluation {
  status: 'well-defined' | 'requires_changes' | 'not-well-defined'
  suggestions: string[]
  recommendations: string[]
  pain_points: string[]
  market_existence: string
}

interface TargetAudienceSegment {
  segment: string
  common_pain_points: string[]
  interaction: string
  targeting_strategy: string
}

interface TargetAudienceEvaluation {
  status: 'well-defined' | 'requires_changes' | 'not-well-defined'
  existence: string
  suggestions: string[]
  recommendations: TargetAudienceSegment[]
}

export interface IdeaEvaluationResult {
  problem_evaluation: ProblemEvaluation
  target_audience: TargetAudienceEvaluation
}

export interface ContentAndLongTermStrategy {
  valueProposition: string
  mvpRecommendation: {
    coreFeatures: string[]
    problemSolved: string
    toolsRecommendation: string[]
  }
  twoWeekPlan: {
    dayRange: string
    action: string
  }[]
  mvpCostAndTimeline: {
    estimatedCost: string
    timeEstimate: string
    costBreakdown: {
      item: string
      cost: string
      time: string
    }[]
  }
}

interface Competitor {
  name: string
  website: string
  strengths: string[]
  borrowedIdeas: string[]
  investmentApproach: string
}

interface ProductNameSuggestion {
  name: string
  domainExamples: string[]
}

interface CollaborationOpportunity {
  partner: string
  strategy: string
}

export interface UserAcquisitionAndCompetitorAnalysis {
  earlyAdoptersAcquisitionIdeas: string[]
  competitorOverview: Competitor[]
  potentialProductNames: ProductNameSuggestion[]
  collaborationOpportunities: CollaborationOpportunity[]
}

interface RecommendedTool {
  tool: string
  description: string
}

interface CaseStudyOutline {
  problemStatement: string
  solution: string
  measurableResults: string
  userTestimonials: string
}

export interface ContentStrategyAndGrowthPlan {
  contentMarketingIdeas: string[]
  keyMetricsToTrackPostLaunch: string[]
  recommendedToolsAndServices: RecommendedTool[]
  caseStudyOutline: CaseStudyOutline
}

export interface IdeaAIService {
  evaluateIdea(
    problem: string,
    targetAudience: string
  ): Promise<IdeaEvaluationResult>

  evaluateContentAndLongTermStrategy(
    problem: string,
    targetAudience: string
  ): Promise<ContentAndLongTermStrategy>

  evaluateUserAcquisitionAndCompetitorAnalysis(
    problem: string,
    targetAudience: string
  ): Promise<UserAcquisitionAndCompetitorAnalysis>

  evaluateContentStrategyAndGrowthPlan(
    problem: string,
    targetAudience: string
  ): Promise<ContentStrategyAndGrowthPlan>
}
