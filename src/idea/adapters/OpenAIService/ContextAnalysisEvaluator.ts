import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

interface KeyMetric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

interface ActionPriority {
  action: string
  impact: number
  effort: number
  impactDescription: string
  effortDescription: string
}

interface Evaluation {
  problemDefinition: string
  region: string
  marketExistence: string[]
  existingSolutions: string[]
  mainChallenges: string[]
  targetUsers: string
  whyItMatters: string
  opportunities: string[]
  callToAction: string[]
  keyMetrics: KeyMetric[]
  actionPriorities: ActionPriority[]
}

const ResponseSchema = z.object({
  context_analysis: z.object({
    problem_definition: z.string(),
    region: z.string(),
    market_existence: z.array(z.string()),
    existing_solutions: z.array(z.string()),
    main_challenges: z.array(z.string()),
    target_users: z.string(),
    why_it_matters: z.string(),
    opportunities: z.array(z.string()),
    call_to_action: z.array(z.string()),
    key_metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        change: z.string(),
        trend: z.enum(['up', 'down', 'neutral']),
      })
    ),
    action_priorities: z.array(
      z.object({
        action: z.string(),
        impact: z.number(),
        effort: z.number(),
        impactDescription: z.string(),
        effortDescription: z.string(),
      })
    ),
  }),
})

export class ContextAnalysisEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'ContextAnalysisEvaluator'
  }
  protected get promptName() {
    return '00-context-analysis'
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
    return 'context_analysis'
  }

  async evaluateContext(
    ideaId: string,
    problem: string,
    marketExistence: string
  ): Promise<Evaluation> {
    const messages = [
      {
        role: 'user' as const,
        content: [
          {
            type: 'text' as const,
            text: `Here is the problem my product aims to solve: """
${problem.trim()}"""

Also I have a market existence research: """
${marketExistence.trim()}"""`,
          },
        ],
      },
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return {
      problemDefinition: response.context_analysis.problem_definition,
      region: response.context_analysis.region,
      marketExistence: response.context_analysis.market_existence,
      existingSolutions: response.context_analysis.existing_solutions,
      mainChallenges: response.context_analysis.main_challenges,
      targetUsers: response.context_analysis.target_users,
      whyItMatters: response.context_analysis.why_it_matters,
      opportunities: response.context_analysis.opportunities,
      callToAction: response.context_analysis.call_to_action,
      keyMetrics: response.context_analysis.key_metrics,
      actionPriorities: response.context_analysis.action_priorities,
    }
  }
}
