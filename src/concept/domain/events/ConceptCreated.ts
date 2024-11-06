import { Event } from '@/concept/events/Event'

export class ConceptCreated implements Event {
  public readonly type = 'ConceptCreated'
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
