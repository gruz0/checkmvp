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
    this.validateShortFormContent(shortFormContent)
    this.shortFormContents.push(shortFormContent)
  }

  public addLongFormContent(longFormContent: LongFormContent): void {
    this.validateLongFormContent(longFormContent)
    this.longFormContents.push(longFormContent)
  }

  public addVideoContent(videoContent: VideoContent): void {
    this.validateVideoContent(videoContent)
    this.videoContents.push(videoContent)
  }

  public getShortFormContents(): ShortFormContent[] {
    return [...this.shortFormContents]
  }

  public getLongFormContents(): LongFormContent[] {
    return [...this.longFormContents]
  }

  public getVideoContents(): VideoContent[] {
    return [...this.videoContents]
  }

  private validateShortFormContent(content: ShortFormContent): void {
    if (!content) {
      throw new Error('ShortFormContent cannot be null or undefined')
    }
    this.validateStringProperty(content.header, 'header')
    this.validateStringProperty(content.platform, 'platform')
    this.validateStringProperty(content.content, 'content')
    this.validateStringProperty(content.imagePrompt, 'imagePrompt')
    this.validateStringArray(content.tips, 'tips')
  }

  private validateLongFormContent(content: LongFormContent): void {
    if (!content) {
      throw new Error('LongFormContent cannot be null or undefined')
    }
    this.validateStringProperty(content.header, 'header')
    this.validateStringProperty(content.platform, 'platform')
    this.validateStringProperty(content.title, 'title')
    this.validateStringProperty(content.content, 'content')
    this.validateStringProperty(content.imagePrompt, 'imagePrompt')
    this.validateStringArray(content.tips, 'tips')
  }

  private validateVideoContent(content: VideoContent): void {
    if (!content) {
      throw new Error('VideoContent cannot be null or undefined')
    }
    this.validateStringProperty(content.header, 'header')
    this.validateStringProperty(content.platform, 'platform')
    this.validateStringProperty(content.title, 'title')
    this.validateStringProperty(content.imagePrompt, 'imagePrompt')
    this.validateStringArray(content.script, 'script')
    this.validateStringArray(content.tips, 'tips')
  }

  private validateStringProperty(value: string, propertyName: string): void {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`${propertyName} cannot be empty`)
    }
  }

  private validateStringArray(arr: string[], propertyName: string): void {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error(`${propertyName} cannot be empty`)
    }
    arr.forEach((item, index) => {
      if (typeof item !== 'string' || item.trim() === '') {
        throw new Error(
          `${propertyName} at index ${index} must be a non-empty string`
        )
      }
    })
  }
}
