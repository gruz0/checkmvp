import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

interface ElevatorPitch {
  hook: string
  problem: string
  solution: string
  valueProposition: string
  cta: string
}

type Evaluation = ElevatorPitch[]

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ValueProposition {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

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

export class ElevatorPitchesEvaluator {
  static className = 'ElevatorPitchesEvaluator'
  static prompt = '00-elevator-pitch-evaluation'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateElevatorPitches(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', ElevatorPitchesEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(ElevatorPitchesEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${ElevatorPitchesEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: ElevatorPitchesEvaluator.model,
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
                text: `Here is the problem my product aims to solve: """
${problem.trim()}"""

Here are my segments: """
${targetAudiences
  .map((targetAudience, idx) => {
    let content = ''

    content += `Segment ${idx + 1}: ${targetAudience.segment}\n`
    content += `Description: ${targetAudience.description}\n`
    content += `Challenges:\n${targetAudience.challenges.join('; ')}\n\n`

    return content
  })
  .join('\n\n')}
"""

And here is my value proposition:
- Main benefit: ${valueProposition.mainBenefit}
- Problem solving: ${valueProposition.problemSolving}
- Differentiation: ${valueProposition.differentiation}`,
              },
            ],
          },
        ],
        top_p: ElevatorPitchesEvaluator.nucleusSampling,
        max_completion_tokens: ElevatorPitchesEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'elevator_pitches'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${ElevatorPitchesEvaluator.className} called`,
        data: {
          model: ElevatorPitchesEvaluator.model,
          top_p: ElevatorPitchesEvaluator.nucleusSampling,
          max_completion_tokens: ElevatorPitchesEvaluator.maxCompletionTokens,
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

      const elevatorPitches = message.parsed.elevator_pitches

      return elevatorPitches.map((pitch) => ({
        hook: pitch.hook,
        problem: pitch.problem,
        solution: pitch.solution,
        valueProposition: pitch.value_proposition,
        cta: pitch.call_to_action,
      }))
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
