import { Event } from '@/idea/events/Event'

export class ValuePropositionEvaluated implements Event {
  public readonly type = 'ValuePropositionEvaluated'
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
