import OpenAI from 'openai'
import {
  ContentAndLongTermStrategy,
  ContentStrategyAndGrowthPlan,
  IdeaAIService,
  IdeaEvaluationResult,
  UserAcquisitionAndCompetitorAnalysis,
} from '@/lib/IdeaAIService'
import { getPromptContent } from '@/lib/prompts'

export class ChatGPTIdeaAIService implements IdeaAIService {
  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateIdea(
    problem: string,
    targetAudience: string
  ): Promise<IdeaEvaluationResult> {
    const promptContent = getPromptContent('00-new-idea')

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

My target audience is: """
${targetAudience.trim()}"""`,
            },
          ],
        },
      ],
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const result = JSON.parse(content.trim()) as IdeaEvaluationResult

    console.debug(JSON.stringify({ evaluateIdea: result }, null, 2))

    return result
  }

  async evaluateContentAndLongTermStrategy(
    problem: string,
    targetAudience: string
  ): Promise<ContentAndLongTermStrategy> {
    const promptContent = getPromptContent('00-content-and-long-term-strategy')

    if (!promptContent) {
      throw new Error('Prompt content not found')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: promptContent
                .trim()
                .replace('{problem_description}', problem.trim())
                .replace('{target_audience}', targetAudience.trim()),
            },
          ],
        },
      ],
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const result = JSON.parse(content.trim()) as ContentAndLongTermStrategy

    console.debug(
      JSON.stringify({ contentAndLongTermStrategy: result }, null, 2)
    )

    return result
  }

  async evaluateUserAcquisitionAndCompetitorAnalysis(
    problem: string,
    targetAudience: string
  ): Promise<UserAcquisitionAndCompetitorAnalysis> {
    const promptContent = getPromptContent(
      '00-user-acquisition-and-competitor-analysis'
    )

    if (!promptContent) {
      throw new Error('Prompt content not found')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: promptContent
                .trim()
                .replace('{problem_description}', problem.trim())
                .replace('{target_audience}', targetAudience.trim()),
            },
          ],
        },
      ],
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const result = JSON.parse(
      content.trim()
    ) as UserAcquisitionAndCompetitorAnalysis

    console.debug(
      JSON.stringify({ userAcquisitionAndCompetitorAnalysis: result }, null, 2)
    )

    return result
  }

  async evaluateContentStrategyAndGrowthPlan(
    problem: string,
    targetAudience: string
  ): Promise<ContentStrategyAndGrowthPlan> {
    const promptContent = getPromptContent(
      '00-content-strategy-and-growth-plan'
    )

    if (!promptContent) {
      throw new Error('Prompt content not found')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: promptContent
                .trim()
                .replace('{problem_description}', problem.trim())
                .replace('{target_audience}', targetAudience.trim()),
            },
          ],
        },
      ],
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const result = JSON.parse(content.trim()) as ContentStrategyAndGrowthPlan

    console.debug(
      JSON.stringify({ contentStrategyAndGrowthPlan: result }, null, 2)
    )

    return result
  }
}
