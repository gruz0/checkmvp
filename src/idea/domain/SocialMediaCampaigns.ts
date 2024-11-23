interface ShortFormContent {
  header: string
  platform: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface LongFormContent {
  header: string
  platform: string
  title: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface VideoContent {
  header: string
  platform: string
  title: string
  script: string[]
  tips: string[]
  imagePrompt: string
}

export class SocialMediaCampaigns {
  private readonly shortFormContents: ShortFormContent[] = []
  private readonly longFormContents: LongFormContent[] = []
  private readonly videoContents: VideoContent[] = []

  private constructor() {}

  static New(): SocialMediaCampaigns {
    return new SocialMediaCampaigns()
  }

  public addShortFormContent(shortFormContent: ShortFormContent): void {
    this.shortFormContents.push(shortFormContent)
  }

  public addLongFormContent(longFormContent: LongFormContent): void {
    this.longFormContents.push(longFormContent)
  }

  public addVideoContent(videoContent: VideoContent): void {
    this.videoContents.push(videoContent)
  }

  public getShortFormContents(): ShortFormContent[] {
    return this.shortFormContents
  }

  public getLongFormContents(): LongFormContent[] {
    return this.longFormContents
  }

  public getVideoContents(): VideoContent[] {
    return this.videoContents
  }
}
