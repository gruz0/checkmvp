import { Event } from '@/idea/events/Event'

export class IdeaArchived implements Event {
  static eventName = 'IdeaArchived'

  public readonly type = IdeaArchived.eventName
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
