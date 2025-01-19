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
import { TestingPlan } from '@/idea/domain/TestingPlan'
import { ValueProposition } from '@/idea/domain/ValueProposition'
import { Identity } from '@/shared/Identity'

export class Idea {
  private valueProposition: ValueProposition | null = null
  private marketAnalysis: MarketAnalysis | null = null
  private competitorAnalysis: CompetitorAnalysis | null = null
  private productNames: ProductName[] | null = null
  private swotAnalysis: SWOTAnalysis | null = null
  private elevatorPitches: ElevatorPitch[] | null = null
  private googleTrendsKeywords: GoogleTrendsKeyword[] | null = null
  private contentIdeasForMarketing: ContentIdeasForMarketing | null = null
  private socialMediaCampaigns: SocialMediaCampaigns | null = null
  private testingPlan: TestingPlan | null = null
  private migrated: boolean = false
  private archived: boolean = false

  private constructor(
    private readonly id: Identity,
    private readonly conceptId: Identity,
    private readonly problem: Problem,
    private readonly marketExistence: string,
    private readonly targetAudiences: TargetAudience[]
  ) {}

  static New(
    id: string,
    conceptId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Idea {
    if (!problem || problem.trim() === '') {
      throw new Error('Problem cannot be empty')
    }

    if (!marketExistence || marketExistence.trim() === '') {
      throw new Error('Market existence cannot be empty')
    }

    if (targetAudiences.length === 0) {
      throw new Error('Target audiences cannot be empty')
    }

    return new Idea(
      Identity.New(id),
      Identity.New(conceptId),
      Problem.New(problem),
      marketExistence.trim(),
      targetAudiences
    )
  }

  public updateTargetAudience(updatedAudience: TargetAudience): void {
    const index = this.targetAudiences.findIndex(
      (audience) =>
        audience.getId().getValue() === updatedAudience.getId().getValue()
    )

    if (index === -1) {
      throw new Error(
        `TargetAudience with ID ${updatedAudience.getId().getValue()} does not exist`
      )
    }

    const why = updatedAudience.getWhy()
    if (why === null) {
      throw new Error('Why has not been set for this TargetAudience.')
    }

    const painPoints = updatedAudience.getPainPoints()
    if (painPoints === null) {
      throw new Error('PainPoints have not been set for this TargetAudience.')
    }

    const targetingStrategy = updatedAudience.getTargetingStrategy()
    if (targetingStrategy === null) {
      throw new Error(
        'TargetingStrategy has not been set for this TargetAudience.'
      )
    }

    this.targetAudiences[index].setWhy(why)
    this.targetAudiences[index].setPainPoints(painPoints)
    this.targetAudiences[index].setTargetingStrategy(targetingStrategy)
  }

  public setValueProposition(valueProposition: ValueProposition): void {
    if (this.valueProposition !== null) {
      throw new Error('ValueProposition already set')
    }

    this.valueProposition = valueProposition
  }

  public setMarketAnalysis(marketAnalysis: MarketAnalysis): void {
    if (this.marketAnalysis !== null) {
      throw new Error('MarketAnalysis already set')
    }

    this.marketAnalysis = marketAnalysis
  }

  public setCompetitorAnalysis(competitorAnalysis: CompetitorAnalysis): void {
    if (this.competitorAnalysis !== null) {
      throw new Error('CompetitorAnalysis already set')
    }

    this.competitorAnalysis = competitorAnalysis
  }

  public addProductName(productName: ProductName): void {
    if (this.productNames === null) {
      this.productNames = []
    }

    const exists = this.productNames.some(
      (ta) => ta.getProductName() === productName.getProductName()
    )

    if (exists) {
      throw new Error('ProductName already exists')
    }

    this.productNames.push(productName)
  }

  public setSWOTAnalysis(swotAnalysis: SWOTAnalysis): void {
    if (this.swotAnalysis !== null) {
      throw new Error('SWOTAnalysis already set')
    }

    this.swotAnalysis = swotAnalysis
  }

  public addElevatorPitch(elevatorPitch: ElevatorPitch): void {
    if (this.elevatorPitches === null) {
      this.elevatorPitches = []
    }

    const exists = this.elevatorPitches.some(
      (ta) => ta.getHook() === elevatorPitch.getHook()
    )

    if (exists) {
      throw new Error('ElevatorPitch already exists')
    }

    this.elevatorPitches.push(elevatorPitch)
  }

  public addGoogleTrendsKeyword(keyword: GoogleTrendsKeyword): void {
    if (this.googleTrendsKeywords === null) {
      this.googleTrendsKeywords = []
    }

    const exists = this.googleTrendsKeywords.some(
      (ta) => ta.getKeyword() === keyword.getKeyword()
    )

    if (exists) {
      throw new Error('GoogleTrendsKeyword already exists')
    }

    this.googleTrendsKeywords.push(keyword)
  }

  public setContentIdeasForMarketing(
    contentIdeas: ContentIdeasForMarketing
  ): void {
    if (this.contentIdeasForMarketing !== null) {
      throw new Error('ContentIdeasForMarketing already set')
    }

    this.contentIdeasForMarketing = contentIdeas
  }

  public setSocialMediaCampaigns(
    socialMediaCampaigns: SocialMediaCampaigns
  ): void {
    if (this.socialMediaCampaigns !== null) {
      throw new Error('SocialMediaCampaigns already set')
    }

    this.socialMediaCampaigns = socialMediaCampaigns
  }

  public setTestingPlan(testingPlan: TestingPlan): void {
    if (this.testingPlan !== null) {
      throw new Error('TestingPlan already set')
    }

    this.testingPlan = testingPlan
  }

  public finalizeMigration(): void {
    if (this.migrated) {
      throw new Error('Idea was already migrated')
    }

    this.migrated = true
  }

  public archive(): void {
    if (this.archived) {
      throw new Error('Idea was already archived')
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

  public getTargetAudiences(): ReadonlyArray<TargetAudience> {
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

  public getProductNames(): ReadonlyArray<ProductName> | null {
    return this.productNames
  }

  public getSWOTAnalysis(): SWOTAnalysis | null {
    return this.swotAnalysis
  }

  public getElevatorPitches(): ReadonlyArray<ElevatorPitch> | null {
    return this.elevatorPitches
  }

  public getGoogleTrendsKeywords(): ReadonlyArray<GoogleTrendsKeyword> | null {
    return this.googleTrendsKeywords
  }

  public getContentIdeasForMarketing(): ContentIdeasForMarketing | null {
    return this.contentIdeasForMarketing
  }

  public getSocialMediaCampaigns(): SocialMediaCampaigns | null {
    return this.socialMediaCampaigns
  }

  public getTestingPlan(): TestingPlan | null {
    return this.testingPlan
  }

  public isMigrated(): boolean {
    return this.migrated
  }

  public isArchived(): boolean {
    return this.archived
  }
}
