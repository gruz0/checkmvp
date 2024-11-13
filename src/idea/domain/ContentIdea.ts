type Section =
  | 'socialMediaCampaigns'
  | 'bloggingAndGuestPosts'
  | 'emailMarketing'
  | 'surveysAndPolls'
  | 'videoContent'
  | 'infographicsAndVisualContent'
  | 'communityEngagement'
  | 'paidAdvertising'
  | 'webinarsAndLiveStreams'
  | 'partnershipsAndCollaborations'

const Sections: Section[] = [
  'socialMediaCampaigns',
  'bloggingAndGuestPosts',
  'emailMarketing',
  'surveysAndPolls',
  'videoContent',
  'infographicsAndVisualContent',
  'communityEngagement',
  'paidAdvertising',
  'webinarsAndLiveStreams',
  'partnershipsAndCollaborations',
]

function isValidSection(name: string): name is Section {
  return Sections.includes(name as Section)
}

export class Strategy {
  private readonly name: Section

  private constructor(name: Section) {
    this.name = name
  }

  static New(name: string): Strategy {
    if (!isValidSection(name)) {
      throw new Error(`Invalid section name: ${name}`)
    }

    return new Strategy(name)
  }

  public getName(): string {
    return this.name
  }
}

export class ContentIdea {
  private readonly strategy: Strategy
  private readonly platforms: string[]
  private readonly ideas: string[]
  private readonly benefits: string[]

  private constructor(
    strategy: Strategy,
    platforms: string[],
    ideas: string[],
    benefits: string[]
  ) {
    this.strategy = strategy
    this.platforms = platforms
    this.ideas = ideas
    this.benefits = benefits
  }

  static New(
    strategy: Strategy,
    platforms: string[],
    ideas: string[],
    benefits: string[]
  ): ContentIdea {
    return new ContentIdea(strategy, platforms, ideas, benefits)
  }

  public getSection(): Strategy {
    return this.strategy
  }

  public getPlatforms(): string[] {
    return this.platforms
  }

  public getIdeas(): string[] {
    return this.ideas
  }

  public getBenefits(): string[] {
    return this.benefits
  }
}
