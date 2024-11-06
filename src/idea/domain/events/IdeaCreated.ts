import { Event } from '@/idea/events/Event'

export class IdeaCreated implements Event {
  public readonly type = 'IdeaCreated'
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
