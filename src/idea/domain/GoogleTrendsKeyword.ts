export class GoogleTrendsKeyword {
  private constructor(private readonly keyword: string) {}

  static New(keyword: string): GoogleTrendsKeyword {
    if (typeof keyword !== 'string') {
      throw new Error('Keyword must be a string.')
    }

    const cleanKeyword = keyword.trim()

    if (cleanKeyword.length === 0) {
      throw new Error('Keyword cannot be empty.')
    }

    if (cleanKeyword.length < 2 || cleanKeyword.length > 100) {
      throw new Error('Keyword must be between 2 and 100 characters.')
    }

    return new GoogleTrendsKeyword(cleanKeyword)
  }

  public getKeyword(): string {
    return this.keyword
  }
}
