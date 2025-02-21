import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

export abstract class BasePrompt<TResponse, TEvaluation> {
  protected readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey })
  }

  protected abstract get className(): string
  protected abstract get promptName(): string
  protected abstract get model(): string
  protected abstract get nucleusSampling(): number
  protected abstract get maxCompletionTokens(): number
  protected abstract get responseSchema(): z.ZodType<TResponse>
  protected abstract get responseKey(): string

  protected abstract transformResponse(response: TResponse): TEvaluation

  protected async evaluate(
    messages: Array<OpenAI.Chat.ChatCompletionMessageParam>
  ): Promise<TEvaluation> {
    try {
      const promptContent = getPromptContent(this.promptName)
      if (!promptContent) {
        throw new Error(`Prompt content ${this.promptName} not found`)
      }

      const systemMessage: OpenAI.Chat.ChatCompletionMessageParam = {
        role: 'system',
        content: [{ type: 'text', text: promptContent.trim() }],
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: this.model,
        messages: [systemMessage, ...messages],
        top_p: this.nucleusSampling,
        max_completion_tokens: this.maxCompletionTokens,
        response_format: this.responseFormat,
        n: 1,
      })

      this.addBreadcrumb(response)

      const message = response.choices[0].message
      if (message.refusal) {
        throw new Error('Message refusal: ' + message.refusal)
      }

      if (!message.parsed) {
        throw new Error('Message was not parsed')
      }

      return this.transformResponse(message.parsed)
    } catch (e) {
      Sentry.captureException(e)
      throw e
    }
  }

  protected get responseFormat() {
    return zodResponseFormat(this.responseSchema, this.responseKey)
  }

  protected buildUserMessage(
    text: string
  ): OpenAI.Chat.ChatCompletionMessageParam {
    return {
      role: 'user' as const,
      content: [
        {
          type: 'text' as const,
          text: text.trim(),
        },
      ],
    }
  }

  private addBreadcrumb(response: OpenAI.Chat.ChatCompletion) {
    Sentry.addBreadcrumb({
      message: `OpenAI ${this.className} called`,
      data: {
        model: this.model,
        top_p: this.nucleusSampling,
        max_completion_tokens: this.maxCompletionTokens,
        usage: response.usage,
        choices: response.choices.length,
      },
      level: 'info',
    })
  }
}
