import { ContentIdea } from '@/idea/domain/ContentIdea'

export class ContentIdeasForMarketing {
  private readonly contentIdeas: ContentIdea[] = []

  private constructor() {}

  static New(): ContentIdeasForMarketing {
    return new ContentIdeasForMarketing()
  }

  public addContentIdea(contentIdea: ContentIdea): void {
    if (!contentIdea) {
      throw new Error('ContentIdea cannot be null or undefined')
    }

    if (!(contentIdea instanceof ContentIdea)) {
      throw new Error('Invalid ContentIdea instance')
    }

    this.contentIdeas.push(contentIdea)
  }

  public getContentIdeas(): ContentIdea[] {
    return [...this.contentIdeas]
  }
}
