import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { Problem } from '@/idea/domain/Problem'
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
  private migrated: boolean = false

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

  public finalizeMigration(): void {
    if (this.migrated) {
      throw new Error('Idea was migrated')
    }

    this.migrated = true
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

  public isMigrated(): boolean {
    return this.migrated
  }
}
