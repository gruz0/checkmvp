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

export class ContentAndLongTermStrategyEvaluation {
  private readonly valueProposition: string
  private readonly mvpRecommendation: MVPRecommendation
  private readonly twoWeekPlan: TwoWeekPlan[]
  private readonly mvpCostAndTimeline: MVPCostAndTimeline

  private constructor(
    valueProposition: string,
    mvpRecommendation: MVPRecommendation,
    twoWeekPlan: TwoWeekPlan[],
    mvpCostAndTimeline: MVPCostAndTimeline
  ) {
    this.valueProposition = valueProposition
    this.mvpRecommendation = mvpRecommendation
    this.twoWeekPlan = twoWeekPlan
    this.mvpCostAndTimeline = mvpCostAndTimeline
  }

  static New(
    valueProposition: string,
    mvpRecommendation: MVPRecommendation,
    twoWeekPlan: TwoWeekPlan[],
    mvpCostAndTimeline: MVPCostAndTimeline
  ): ContentAndLongTermStrategyEvaluation {
    return new ContentAndLongTermStrategyEvaluation(
      valueProposition,
      mvpRecommendation,
      twoWeekPlan,
      mvpCostAndTimeline
    )
  }

  public getValueProposition(): string {
    return this.valueProposition
  }

  public getMVPRecommendation(): MVPRecommendation {
    return this.mvpRecommendation
  }

  public getTwoWeekPlan(): TwoWeekPlan[] {
    return this.twoWeekPlan
  }

  public getMVPCostAndTimeline(): MVPCostAndTimeline {
    return this.mvpCostAndTimeline
  }

  public toJSON(): Record<string, unknown> {
    return {
      valueProposition: this.valueProposition,
      mvpRecommendation: this.mvpRecommendation,
      twoWeekPlan: this.twoWeekPlan,
      mvpCostAndTimeline: this.mvpCostAndTimeline,
    }
  }
}
