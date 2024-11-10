import { Event } from '@/idea/events/Event'

export class IdeaArchived implements Event {
  public readonly type = 'IdeaArchived'
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
