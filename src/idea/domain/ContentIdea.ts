import { Strategy } from '@/idea/domain/Strategy'

export class ContentIdea {
  private constructor(
    private readonly strategy: Strategy,
    private readonly platforms: string[],
    private readonly ideas: string[],
    private readonly benefits: string[]
  ) {}

  static New(
    strategy: Strategy,
    platforms: string[],
    ideas: string[],
    benefits: string[]
  ): ContentIdea {
    if (!strategy) {
      throw new Error('Strategy cannot be null or undefined.')
    }

    if (!Array.isArray(platforms) || platforms.length === 0) {
      throw new Error('Platforms cannot be empty.')
    }

    platforms.forEach((platform, index) => {
      if (typeof platform !== 'string' || platform.trim() === '') {
        throw new Error(
          `Platform at index ${index} must be a non-empty string.`
        )
      }
    })

    if (!Array.isArray(ideas) || ideas.length === 0) {
      throw new Error('Ideas cannot be empty.')
    }

    ideas.forEach((idea, index) => {
      if (typeof idea !== 'string' || idea.trim() === '') {
        throw new Error(`Idea at index ${index} must be a non-empty string.`)
      }
    })

    if (!Array.isArray(benefits) || benefits.length === 0) {
      throw new Error('Benefits cannot be empty.')
    }

    benefits.forEach((benefit, index) => {
      if (typeof benefit !== 'string' || benefit.trim() === '') {
        throw new Error(`Benefit at index ${index} must be a non-empty string.`)
      }
    })

    return new ContentIdea(
      strategy,
      platforms.map((p) => p.trim()),
      ideas.map((i) => i.trim()),
      benefits.map((b) => b.trim())
    )
  }

  public getStrategy(): Strategy {
    return this.strategy
  }

  public getPlatforms(): string[] {
    return [...this.platforms]
  }

  public getIdeas(): string[] {
    return [...this.ideas]
  }

  public getBenefits(): string[] {
    return [...this.benefits]
  }
}
