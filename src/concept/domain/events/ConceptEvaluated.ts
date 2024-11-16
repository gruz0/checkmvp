import { Event } from '@/concept/events/Event'

export class ConceptEvaluated implements Event {
  public readonly type = 'ConceptEvaluated'
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
