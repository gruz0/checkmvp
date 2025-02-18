import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'
import { TargetAudience } from './types'

interface Evaluation {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

const ResponseSchema = z.object({
  value_proposition: z.object({
    main_benefit: z.string(),
    problem_solving: z.string(),
    differentiation: z.string(),
  }),
})

export class ValuePropositionEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'ValuePropositionEvaluator'
  }
  protected get promptName() {
    return '00-value-proposition-evaluation'
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
    return 'value_proposition'
  }

  async evaluateValueProposition(
    ideaId: string,
    problem: string,
    targetAudience: TargetAudience
  ): Promise<Evaluation> {
    const messages = [
      this.messageBuilder.createProblemMessage(problem),
      ...this.messageBuilder.createTargetAudienceMessages(targetAudience),
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return {
      mainBenefit: response.value_proposition.main_benefit,
      problemSolving: response.value_proposition.problem_solving,
      differentiation: response.value_proposition.differentiation,
    }
  }
}
