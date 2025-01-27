import { Event } from '@/idea/events/Event'

export class ContextAnalysisEvaluated implements Event {
  static eventName = 'ContextAnalysisEvaluated'

  public readonly type = ContextAnalysisEvaluated.eventName
  public readonly payload: {
    id: string
  }

  constructor(id: string) {
    this.payload = { id }
  }
}
