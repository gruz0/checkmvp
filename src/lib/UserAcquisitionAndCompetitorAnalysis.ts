type Competitor = {
  name: string
  website: string
  strengths: string[]
  borrowedIdeas: string[]
  investmentApproach: string
}

type ProductNameSuggestion = {
  name: string
  domainExamples: string[]
}

type CollaborationOpportunity = {
  partner: string
  strategy: string
}

export class UserAcquisitionAndCompetitorAnalysis {
  private readonly earlyAdoptersAcquisitionIdeas: string[]
  private readonly competitorOverview: Competitor[]
  private readonly potentialProductNames: ProductNameSuggestion[]
  private readonly collaborationOpportunities: CollaborationOpportunity[]

  private constructor(
    earlyAdoptersAcquisitionIdeas: string[],
    competitorOverview: Competitor[],
    potentialProductNames: ProductNameSuggestion[],
    collaborationOpportunities: CollaborationOpportunity[]
  ) {
    this.earlyAdoptersAcquisitionIdeas = earlyAdoptersAcquisitionIdeas
    this.competitorOverview = competitorOverview
    this.potentialProductNames = potentialProductNames
    this.collaborationOpportunities = collaborationOpportunities
  }

  static New(
    earlyAdoptersAcquisitionIdeas: string[],
    competitorOverview: Competitor[],
    potentialProductNames: ProductNameSuggestion[],
    collaborationOpportunities: CollaborationOpportunity[]
  ): UserAcquisitionAndCompetitorAnalysis {
    return new UserAcquisitionAndCompetitorAnalysis(
      earlyAdoptersAcquisitionIdeas,
      competitorOverview,
      potentialProductNames,
      collaborationOpportunities
    )
  }

  public getEarlyAdoptersAcquisitionIdeas(): string[] {
    return this.earlyAdoptersAcquisitionIdeas
  }

  public getCompetitorOverview(): Competitor[] {
    return this.competitorOverview
  }

  public getPotentialProductNames(): ProductNameSuggestion[] {
    return this.potentialProductNames
  }

  public getCollaborationOpportunities(): CollaborationOpportunity[] {
    return this.collaborationOpportunities
  }

  public toJSON(): Record<string, unknown> {
    return {
      earlyAdoptersAcquisitionIdeas: this.earlyAdoptersAcquisitionIdeas,
      competitorOverview: this.competitorOverview,
      potentialProductNames: this.potentialProductNames,
      collaborationOpportunities: this.collaborationOpportunities,
    }
  }
}
