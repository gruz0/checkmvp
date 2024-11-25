import { Event } from '@/idea/events/Event'

export class IdeaCreated implements Event {
  static eventName = 'IdeaCreated'

  public readonly type = IdeaCreated.eventName
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
