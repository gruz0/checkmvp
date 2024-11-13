import { ContentIdea } from '@/idea/domain/ContentIdea'

export class ContentIdeasForMarketing {
  private readonly contentIdeas: ContentIdea[] = []

  private constructor() {}

  static New(): ContentIdeasForMarketing {
    return new ContentIdeasForMarketing()
  }

  public addContentIdea(contentIdea: ContentIdea): void {
    this.contentIdeas.push(contentIdea)
  }

  public getContentIdeas(): ContentIdea[] {
    return this.contentIdeas
  }
}
