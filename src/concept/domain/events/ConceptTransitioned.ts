import { Event } from '@/concept/events/Event'

export class ConceptTransitioned implements Event {
  public readonly type = 'ConceptTransitioned'
  public readonly payload: {
    id: string
    ideaId: string
  }

  constructor(id: string, ideaId: string) {
    this.payload = { id, ideaId }
  }
}
