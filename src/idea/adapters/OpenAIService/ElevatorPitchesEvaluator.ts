import OpenAI from 'openai'
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
  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateElevatorPitches(
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const promptContent = getPromptContent('00-elevator-pitch-evaluation')

    if (!promptContent) {
      throw new Error('Prompt content not found')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
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
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0.7,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const analysis = ResponseSchema.parse(JSON.parse(content))

    return analysis.elevator_pitches.map((pitch) => ({
      hook: pitch.hook,
      problem: pitch.problem,
      solution: pitch.solution,
      valueProposition: pitch.value_proposition,
      cta: pitch.call_to_action,
    }))
  }
}
