export class GoogleTrendsKeyword {
  private readonly keyword: string

  private constructor(keyword: string) {
    this.keyword = keyword
  }

  static New(keyword: string): GoogleTrendsKeyword {
    return new GoogleTrendsKeyword(keyword)
  }

  public getKeyword(): string {
    return this.keyword
  }
}
