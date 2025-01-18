import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface Evaluation {
  status: Status
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
  clarityScore: {
    overallScore: number
    metrics: {
      problemClarity: number
      targetAudienceClarity: number
      scopeDefinition: number
      valuePropositionClarity: number
    }
  }
  languageAnalysis: {
    vagueTerms: string[]
    missingContext: string[]
    ambiguousStatements: string[]
  }
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
  validationMetrics: {
    marketSize: string
    accessibility: number
    painPointIntensity: number
    willingnessToPay: number
  }
}

const ResponseSchema = z.object({
  problem_evaluation: z.object({
    status: z.enum(['well-defined', 'requires_changes', 'not-well-defined']),
    suggestions: z.array(z.string()),
    recommendations: z.array(z.string()),
    pain_points: z.array(z.string()),
    clarity_score: z.object({
      overall_score: z.number(),
      metrics: z.object({
        problem_clarity: z.number(),
        target_audience_clarity: z.number(),
        scope_definition: z.number(),
        value_proposition_clarity: z.number(),
      }),
    }),
    language_analysis: z.object({
      vague_terms: z.array(z.string()),
      missing_context: z.array(z.string()),
      ambiguous_statements: z.array(z.string()),
    }),
    market_existence: z.object({
      market_size_and_growth_trends: z.string(),
      existing_solutions_and_competitors: z.string(),
      market_gaps_and_opportunities: z.string(),
      target_users: z.string(),
      challenges_and_barriers_to_entry: z.string(),
    }),
    target_audience: z.array(
      z.object({
        segment: z.string(),
        description: z.string(),
        challenges: z.array(z.string()),
        validation_metrics: z.object({
          market_size: z.string(),
          accessibility: z.number(),
          pain_point_intensity: z.number(),
          willingness_to_pay: z.number(),
        }),
      })
    ),
  }),
})

export class ConceptEvaluator {
  static className = 'ConceptEvaluator'
  static prompt = '00-problem-evaluation'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 3000

  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateConcept(
    conceptId: string,
    problem: string
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', ConceptEvaluator.className)
    Sentry.setTag('concept_id', conceptId)

    try {
      const promptContent = getPromptContent(ConceptEvaluator.prompt)

      if (!promptContent) {
        throw new Error(`Prompt content ${ConceptEvaluator.prompt} not found`)
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: ConceptEvaluator.model,
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: promptContent.trim(),
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: problem.trim(),
              },
            ],
          },
        ],
        top_p: ConceptEvaluator.nucleusSampling,
        max_completion_tokens: ConceptEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(
          ResponseSchema,
          'problem_evaluation'
        ),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${ConceptEvaluator.className} called`,
        data: {
          model: ConceptEvaluator.model,
          top_p: ConceptEvaluator.nucleusSampling,
          max_completion_tokens: ConceptEvaluator.maxCompletionTokens,
          usage: response.usage,
          choices: response.choices.length,
        },
        level: 'info',
      })

      const message = response.choices[0].message

      if (message.refusal) {
        // TODO: Handle refusal
        throw new Error('Message refusal: ' + message.refusal)
      }

      if (!message.parsed) {
        // TODO: Add Sentry message context
        throw new Error('Message was not parsed')
      }

      const problemEvaluation = message.parsed.problem_evaluation

      console.log(JSON.stringify(problemEvaluation, null, 2))

      if (problemEvaluation.status === 'not-well-defined') {
        return {
          status: problemEvaluation.status,
          suggestions: problemEvaluation.suggestions,
          recommendations: [],
          painPoints: [],
          marketExistence: '',
          targetAudience: [],
          clarityScore: {
            overallScore: 0,
            metrics: {
              problemClarity: 0,
              targetAudienceClarity: 0,
              scopeDefinition: 0,
              valuePropositionClarity: 0,
            },
          },
          languageAnalysis: {
            vagueTerms: [],
            missingContext: [],
            ambiguousStatements: [],
          },
        }
      }

      const marketExistence: string[] = []

      const marketExistenceData = problemEvaluation.market_existence

      if (marketExistenceData) {
        if (marketExistenceData.market_size_and_growth_trends) {
          marketExistence.push(
            `📈 Market Size and Growth Trends:\n\n${marketExistenceData.market_size_and_growth_trends}`
          )
        }

        if (marketExistenceData.existing_solutions_and_competitors) {
          marketExistence.push(
            `🏆 Existing Solutions and Competitors:\n\n${marketExistenceData.existing_solutions_and_competitors}`
          )
        }

        if (marketExistenceData.market_gaps_and_opportunities) {
          marketExistence.push(
            `💡 Market Gaps and Opportunities:\n\n${marketExistenceData.market_gaps_and_opportunities}`
          )
        }

        if (marketExistenceData.target_users) {
          marketExistence.push(
            `🎯 Target Users:\n\n${marketExistenceData.target_users}`
          )
        }

        if (marketExistenceData.challenges_and_barriers_to_entry) {
          marketExistence.push(
            `🧱 Challenges and Barriers to Entry:\n\n${marketExistenceData.challenges_and_barriers_to_entry}`
          )
        }
      }

      return {
        status: problemEvaluation.status,
        suggestions: problemEvaluation.suggestions,
        recommendations: problemEvaluation.recommendations,
        painPoints: problemEvaluation.pain_points,
        marketExistence: marketExistence.join('\n\n'),
        targetAudience: problemEvaluation.target_audience.map((audience) => ({
          segment: audience.segment,
          description: audience.description,
          challenges: audience.challenges,
          validationMetrics: {
            marketSize: audience.validation_metrics.market_size,
            accessibility: audience.validation_metrics.accessibility,
            painPointIntensity:
              audience.validation_metrics.pain_point_intensity,
            willingnessToPay: audience.validation_metrics.willingness_to_pay,
          },
        })),
        clarityScore: {
          overallScore: problemEvaluation.clarity_score.overall_score,
          metrics: {
            problemClarity:
              problemEvaluation.clarity_score.metrics.problem_clarity,
            targetAudienceClarity:
              problemEvaluation.clarity_score.metrics.target_audience_clarity,
            scopeDefinition:
              problemEvaluation.clarity_score.metrics.scope_definition,
            valuePropositionClarity:
              problemEvaluation.clarity_score.metrics.value_proposition_clarity,
          },
        },
        languageAnalysis: {
          vagueTerms: problemEvaluation.language_analysis.vague_terms,
          missingContext: problemEvaluation.language_analysis.missing_context,
          ambiguousStatements:
            problemEvaluation.language_analysis.ambiguous_statements,
        },
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
