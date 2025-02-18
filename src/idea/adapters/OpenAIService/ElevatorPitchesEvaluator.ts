import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'
import { TargetAudience, ValueProposition } from './types'

interface ElevatorPitch {
  hook: string
  problem: string
  solution: string
  valueProposition: string
  cta: string
}

type Evaluation = ElevatorPitch[]

const ResponseSchema = z.object({
  elevator_pitches: z.array(
    z.object({
      hook: z.string(),
      problem: z.string(),
      solution: z.string(),
      value_proposition: z.string(),
      call_to_action: z.string(),
    })
  ),
})

export class ElevatorPitchesEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'ElevatorPitchesEvaluator'
  }
  protected get promptName() {
    return '00-elevator-pitch-evaluation'
  }
  protected get model() {
    return 'gpt-4o-mini'
  }
  protected get nucleusSampling() {
    return 0.9
  }
  protected get maxCompletionTokens() {
    return 2000
  }
  protected get responseSchema() {
    return ResponseSchema
  }
  protected get responseKey() {
    return 'elevator_pitches'
  }

  async evaluateElevatorPitches(
    ideaId: string,
    problem: string,
    targetAudience: TargetAudience,
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const messages = [
      this.messageBuilder.createProblemMessage(problem),
      ...this.messageBuilder.createTargetAudienceMessages(targetAudience),
      this.messageBuilder.createValuePropositionMessage(valueProposition),
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return response.elevator_pitches.map((pitch) => ({
      hook: pitch.hook,
      problem: pitch.problem,
      solution: pitch.solution,
      valueProposition: pitch.value_proposition,
      cta: pitch.call_to_action,
    }))
  }
}
