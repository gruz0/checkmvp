import { Identity } from '@/common/domain/Identity'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { ContentIdeasForMarketing } from '@/idea/domain/ContentIdeasForMarketing'
import { ContextAnalysis } from '@/idea/domain/ContextAnalysis'
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
  private contextAnalysis: ContextAnalysis | null = null
  private migrated: boolean = false
  private archived: boolean = false

  private constructor(
    private readonly id: Identity,
    private readonly conceptId: Identity,
    private readonly problem: Problem,
    private readonly marketExistence: string,
    private readonly region: string,
    private readonly productType: string,
    private readonly stage: string,
    private readonly statement: string,
    private readonly hypotheses: string,
    private readonly targetAudience: TargetAudience
  ) {}

  static New(
    id: string,
    conceptId: string,
    problem: string,
    marketExistence: string,
    region: string,
    productType: string,
    stage: string,
    statement: string,
    hypotheses: string,
    targetAudience: TargetAudience
  ): Idea {
    if (!problem || problem.trim() === '') {
      throw new Error('Problem cannot be empty')
    }

    if (!marketExistence || marketExistence.trim() === '') {
      throw new Error('Market existence cannot be empty')
    }

    if (!region || region.trim() === '') {
      throw new Error('Region cannot be empty')
    }

    if (!productType || productType.trim() === '') {
      throw new Error('Product type cannot be empty')
    }

    if (!stage || stage.trim() === '') {
      throw new Error('Stage cannot be empty')
    }

    if (!statement || statement.trim() === '') {
      throw new Error('Statement cannot be empty')
    }

    if (!hypotheses || hypotheses.trim() === '') {
      throw new Error('Hypotheses cannot be empty')
    }

    return new Idea(
      Identity.New(id),
      Identity.New(conceptId),
      Problem.New(problem),
      marketExistence.trim(),
      region.trim(),
      productType.trim(),
      stage.trim(),
      statement.trim(),
      hypotheses.trim(),
      targetAudience
    )
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

  public setContextAnalysis(contextAnalysis: ContextAnalysis): void {
    if (this.contextAnalysis !== null) {
      throw new Error('ContextAnalysis already set')
    }

    this.contextAnalysis = contextAnalysis
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

  public getRegion(): string {
    return this.region
  }

  public getProductType(): string {
    return this.productType
  }

  public getStage(): string {
    return this.stage
  }

  public getStatement(): string {
    return this.statement
  }

  public getHypotheses(): string {
    return this.hypotheses
  }

  public getTargetAudience(): TargetAudience {
    return this.targetAudience
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

  public getContextAnalysis(): ContextAnalysis | null {
    return this.contextAnalysis
  }

  public isMigrated(): boolean {
    return this.migrated
  }

  public isArchived(): boolean {
    return this.archived
  }
}
