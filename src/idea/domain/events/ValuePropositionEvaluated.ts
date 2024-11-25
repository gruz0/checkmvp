import { Event } from '@/idea/events/Event'

export class ValuePropositionEvaluated implements Event {
  static eventName = 'ValuePropositionEvaluated'

  public readonly type = ValuePropositionEvaluated.eventName
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
