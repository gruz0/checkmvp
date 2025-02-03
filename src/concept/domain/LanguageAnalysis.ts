export class LanguageAnalysis {
  private constructor(
    private readonly vagueTerms: string[],
    private readonly missingContext: string[],
    private readonly ambiguousStatements: string[]
  ) {}

  public static New(
    vagueTerms: string[],
    missingContext: string[],
    ambiguousStatements: string[]
  ): LanguageAnalysis {
    this.validateArrayItems(vagueTerms, 'Vague terms')
    this.validateArrayItems(missingContext, 'Missing context')
    this.validateArrayItems(ambiguousStatements, 'Ambiguous statements')

    return new LanguageAnalysis(
      vagueTerms.map((term) => term.trim()),
      missingContext.map((context) => context.trim()),
      ambiguousStatements.map((statement) => statement.trim())
    )
  }

  public getVagueTerms(): string[] {
    return [...this.vagueTerms]
  }

  public getMissingContext(): string[] {
    return [...this.missingContext]
  }

  public getAmbiguousStatements(): string[] {
    return [...this.ambiguousStatements]
  }

  private static validateArrayItems(items: string[], fieldName: string): void {
    if (items.length === 0) {
      return
    }

    if (items.some((item) => item.trim() === '')) {
      throw new Error(`${fieldName} cannot contain empty values`)
    }
  }
}
