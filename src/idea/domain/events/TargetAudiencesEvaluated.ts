import { Event } from '@/idea/events/Event'

export class TargetAudiencesEvaluated implements Event {
  static eventName = 'TargetAudiencesEvaluated'

  public readonly type = TargetAudiencesEvaluated.eventName
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
