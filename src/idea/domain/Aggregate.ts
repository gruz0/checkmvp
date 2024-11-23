import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { ContentIdeasForMarketing } from '@/idea/domain/ContentIdeasForMarketing'
import { ElevatorPitch } from '@/idea/domain/ElevatorPitch'
import { GoogleTrendsKeyword } from '@/idea/domain/GoogleTrendsKeyword'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { Problem } from '@/idea/domain/Problem'
import { ProductName } from '@/idea/domain/ProductName'
import { SWOTAnalysis } from '@/idea/domain/SWOTAnalysis'
import { SocialMediaCampaigns } from '@/idea/domain/SocialMediaCampaigns'
import { TargetAudience } from '@/idea/domain/TargetAudience'
import { ValueProposition } from '@/idea/domain/ValueProposition'
import { Identity } from '@/shared/Identity'

export class Idea {
  private readonly id: Identity
  private readonly conceptId: Identity
  private readonly problem: Problem
  private readonly marketExistence: string

  private targetAudiences: TargetAudience[] = []
  private valueProposition: ValueProposition | null = null
  private marketAnalysis: MarketAnalysis | null = null
  private competitorAnalysis: CompetitorAnalysis | null = null
  private productNames: ProductName[] | null = null
  private swotAnalysis: SWOTAnalysis | null = null
  private elevatorPitches: ElevatorPitch[] | null = null
  private googleTrendsKeywords: GoogleTrendsKeyword[] | null = null
  private contentIdeasForMarketing: ContentIdeasForMarketing | null = null
  private socialMediaCampaigns: SocialMediaCampaigns | null = null
  private migrated: boolean = false
  private archived: boolean = false

  private constructor(
    id: Identity,
    conceptId: Identity,
    problem: Problem,
    marketExistence: string
  ) {
    this.id = id
    this.conceptId = conceptId
    this.problem = problem
    this.marketExistence = marketExistence
  }

  static New(
    id: string,
    conceptId: string,
    problem: string,
    marketExistence: string
  ): Idea {
    return new Idea(
      Identity.New(id),
      Identity.New(conceptId),
      Problem.New(problem),
      marketExistence
    )
  }

  public addTargetAudience(targetAudience: TargetAudience): void {
    // TODO: If targetAudience already exists by ID - replace it
    this.targetAudiences.push(targetAudience)
  }

  public addValueProposition(valueProposition: ValueProposition): void {
    this.valueProposition = valueProposition
  }

  public addMarketAnalysis(marketAnalysis: MarketAnalysis): void {
    this.marketAnalysis = marketAnalysis
  }

  public addCompetitorAnalysis(competitorAnalysis: CompetitorAnalysis): void {
    this.competitorAnalysis = competitorAnalysis
  }

  public addProductName(productName: ProductName): void {
    if (this.productNames === null) {
      this.productNames = []
    }

    this.productNames.push(productName)
  }

  public addSWOTAnalysis(swotAnalysis: SWOTAnalysis): void {
    this.swotAnalysis = swotAnalysis
  }

  public addElevatorPitch(elevatorPitch: ElevatorPitch): void {
    if (this.elevatorPitches === null) {
      this.elevatorPitches = []
    }

    this.elevatorPitches.push(elevatorPitch)
  }

  public addGoogleTrendsKeyword(keyword: GoogleTrendsKeyword): void {
    if (this.googleTrendsKeywords === null) {
      this.googleTrendsKeywords = []
    }

    this.googleTrendsKeywords.push(keyword)
  }

  public addContentIdeasForMarketing(
    contentIdeas: ContentIdeasForMarketing
  ): void {
    this.contentIdeasForMarketing = contentIdeas
  }

  public addSocialMediaCampaigns(
    socialMediaCampaigns: SocialMediaCampaigns
  ): void {
    this.socialMediaCampaigns = socialMediaCampaigns
  }

  public finalizeMigration(): void {
    if (this.migrated) {
      throw new Error('Idea was migrated')
    }

    this.migrated = true
  }

  public archive(): void {
    if (this.archived) {
      throw new Error('Idea was archived')
    }

    this.archived = true
  }

  public getId(): Identity {
    return this.id
  }

  public getConceptId(): Identity {
    return this.conceptId
  }

  public getProblem(): Problem {
    return this.problem
  }

  public getMarketExistence(): string {
    return this.marketExistence
  }

  public getTargetAudiences(): TargetAudience[] {
    return this.targetAudiences
  }

  public getValueProposition(): ValueProposition | null {
    return this.valueProposition
  }

  public getMarketAnalysis(): MarketAnalysis | null {
    return this.marketAnalysis
  }

  public getCompetitorAnalysis(): CompetitorAnalysis | null {
    return this.competitorAnalysis
  }

  public getProductNames(): ProductName[] | null {
    return this.productNames
  }

  public getSWOTAnalysis(): SWOTAnalysis | null {
    return this.swotAnalysis
  }

  public getElevatorPitches(): ElevatorPitch[] | null {
    return this.elevatorPitches
  }

  public getGoogleTrendsKeywords(): GoogleTrendsKeyword[] | null {
    return this.googleTrendsKeywords
  }

  public getContentIdeasForMarketing(): ContentIdeasForMarketing | null {
    return this.contentIdeasForMarketing
  }

  public getSocialMediaCampaigns(): SocialMediaCampaigns | null {
    return this.socialMediaCampaigns
  }

  public isMigrated(): boolean {
    return this.migrated
  }

  public isArchived(): boolean {
    return this.archived
  }
}
