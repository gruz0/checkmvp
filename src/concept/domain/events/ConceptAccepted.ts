import { Event } from '@/concept/events/Event'

export class ConceptAccepted implements Event {
  public readonly type = 'ConceptAccepted'
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
