import OpenAI from 'openai'
import { TargetAudience, ValueProposition } from './types'

export interface MessageBuilder {
  createProblemMessage(problem: string): OpenAI.Chat.ChatCompletionMessageParam

  createMarketExistenceMessage(
    marketExistence: string
  ): OpenAI.Chat.ChatCompletionMessageParam

  createTargetAudienceMessages(
    targetAudience: TargetAudience
  ): OpenAI.Chat.ChatCompletionMessageParam[]

  createValuePropositionMessage(
    valueProposition: ValueProposition
  ): OpenAI.Chat.ChatCompletionMessageParam

  createStatementMessage(
    statement: string
  ): OpenAI.Chat.ChatCompletionMessageParam

  createHypothesesMessage(
    hypotheses: string
  ): OpenAI.Chat.ChatCompletionMessageParam

  createRegionMessage(region: string): OpenAI.Chat.ChatCompletionMessageParam

  createProductTypeMessage(
    productType: string
  ): OpenAI.Chat.ChatCompletionMessageParam

  createStageMessage(stage: string): OpenAI.Chat.ChatCompletionMessageParam
}

export class UserMessageBuilder implements MessageBuilder {
  private buildUserMessage(
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

  createProblemMessage(
    problem: string
  ): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(
      `Here is the problem my product aims to solve:\n${problem}`
    )
  }

  createMarketExistenceMessage(
    marketExistence: string
  ): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(
      `Market existence research:\n${marketExistence}`
    )
  }

  createTargetAudienceMessages(
    targetAudience: TargetAudience
  ): OpenAI.Chat.ChatCompletionMessageParam[] {
    return [
      this.buildUserMessage(
        `Target audience segment:\n${targetAudience.segment}`
      ),
      this.buildUserMessage(
        `Target audience description:\n${targetAudience.description}`
      ),
      this.buildUserMessage(
        `Target audience challenges:\n${targetAudience.challenges.join('\n- ')}`
      ),
    ]
  }

  createValuePropositionMessage(
    valueProposition: ValueProposition
  ): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(
      `Value proposition:\n- Main benefit: ${valueProposition.mainBenefit}\n- Problem solving: ${valueProposition.problemSolving}\n- Differentiation: ${valueProposition.differentiation}`
    )
  }

  createStatementMessage(
    statement: string
  ): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(
      `Here is the statement of the problem:\n${statement}`
    )
  }

  createHypothesesMessage(
    hypotheses: string
  ): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(`Here are the hypotheses:\n${hypotheses}`)
  }

  createRegionMessage(region: string): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(`Region:\n${region}`)
  }

  createProductTypeMessage(
    productType: string
  ): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(`Product Type:\n${productType}`)
  }

  createStageMessage(stage: string): OpenAI.Chat.ChatCompletionMessageParam {
    return this.buildUserMessage(`Stage:\n${stage}`)
  }
}
