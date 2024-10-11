type RecommendedTool = {
  tool: string
  description: string
}

type CaseStudyOutline = {
  problemStatement: string
  solution: string
  measurableResults: string
  userTestimonials: string
}

export class ContentStrategyAndGrowthPlan {
  private readonly contentMarketingIdeas: string[]
  private readonly keyMetricsToTrackPostLaunch: string[]
  private readonly recommendedToolsAndServices: RecommendedTool[]
  private readonly caseStudyOutline: CaseStudyOutline

  private constructor(
    contentMarketingIdeas: string[],
    keyMetricsToTrackPostLaunch: string[],
    recommendedToolsAndServices: RecommendedTool[],
    caseStudyOutline: CaseStudyOutline
  ) {
    this.contentMarketingIdeas = contentMarketingIdeas
    this.keyMetricsToTrackPostLaunch = keyMetricsToTrackPostLaunch
    this.recommendedToolsAndServices = recommendedToolsAndServices
    this.caseStudyOutline = caseStudyOutline
  }

  static New(
    contentMarketingIdeas: string[],
    keyMetricsToTrackPostLaunch: string[],
    recommendedToolsAndServices: RecommendedTool[],
    caseStudyOutline: CaseStudyOutline
  ): ContentStrategyAndGrowthPlan {
    return new ContentStrategyAndGrowthPlan(
      contentMarketingIdeas,
      keyMetricsToTrackPostLaunch,
      recommendedToolsAndServices,
      caseStudyOutline
    )
  }

  public getContentMarketingIdeas(): string[] {
    return this.contentMarketingIdeas
  }

  public getKeyMetricsToTrackPostLaunch(): string[] {
    return this.keyMetricsToTrackPostLaunch
  }

  public getRecommendedToolsAndServices(): RecommendedTool[] {
    return this.recommendedToolsAndServices
  }

  public getCaseStudyOutline(): CaseStudyOutline {
    return this.caseStudyOutline
  }

  public toJSON(): Record<string, unknown> {
    return {
      contentMarketingIdeas: this.contentMarketingIdeas,
      keyMetricsToTrackPostLaunch: this.keyMetricsToTrackPostLaunch,
      recommendedToolsAndServices: this.recommendedToolsAndServices,
      caseStudyOutline: this.caseStudyOutline,
    }
  }
}
