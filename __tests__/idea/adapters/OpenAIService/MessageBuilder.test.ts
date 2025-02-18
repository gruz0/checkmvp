import { UserMessageBuilder } from '@/idea/adapters/OpenAIService/MessageBuilder'
import {
  TargetAudience,
  ValueProposition,
} from '@/idea/adapters/OpenAIService/types'

describe('UserMessageBuilder', () => {
  let messageBuilder: UserMessageBuilder

  beforeEach(() => {
    messageBuilder = new UserMessageBuilder()
  })

  const createExpectedMessage = (content: string) => ({
    role: 'user' as const,
    content: [
      {
        type: 'text' as const,
        text: content.trim(),
      },
    ],
  })

  describe('createProblemMessage', () => {
    it('should create a properly formatted problem message', () => {
      const problem = 'Lack of efficient task management'
      const expected = createExpectedMessage(
        `Here is the problem my product aims to solve:\n${problem}`
      )
      expect(messageBuilder.createProblemMessage(problem)).toEqual(expected)
    })
  })

  describe('createMarketExistenceMessage', () => {
    it('should create a properly formatted market existence message', () => {
      const marketExistence = 'Market research shows high demand'
      const expected = createExpectedMessage(
        `Market existence research:\n${marketExistence}`
      )
      expect(
        messageBuilder.createMarketExistenceMessage(marketExistence)
      ).toEqual(expected)
    })
  })

  describe('createTargetAudienceMessages', () => {
    it('should create properly formatted target audience messages', () => {
      const targetAudience: TargetAudience = {
        segment: 'Small business owners',
        description: 'Entrepreneurs managing teams',
        challenges: ['Time management', 'Resource allocation'],
      }

      const expected = [
        createExpectedMessage(
          `Target audience segment:\n${targetAudience.segment}`
        ),
        createExpectedMessage(
          `Target audience description:\n${targetAudience.description}`
        ),
        createExpectedMessage(
          `Target audience challenges:\n${targetAudience.challenges.join('\n- ')}`
        ),
      ]

      expect(
        messageBuilder.createTargetAudienceMessages(targetAudience)
      ).toEqual(expected)
    })
  })

  describe('createValuePropositionMessage', () => {
    it('should create a properly formatted value proposition message', () => {
      const valueProposition: ValueProposition = {
        mainBenefit: 'Increased productivity',
        problemSolving: 'Automated task management',
        differentiation: 'AI-powered solutions',
      }

      const expected = createExpectedMessage(
        `Value proposition:\n- Main benefit: ${valueProposition.mainBenefit}\n- Problem solving: ${valueProposition.problemSolving}\n- Differentiation: ${valueProposition.differentiation}`
      )

      expect(
        messageBuilder.createValuePropositionMessage(valueProposition)
      ).toEqual(expected)
    })
  })

  describe('createStatementMessage', () => {
    it('should create a properly formatted statement message', () => {
      const statement = 'Problem statement details'
      const expected = createExpectedMessage(
        `Here is the statement of the problem:\n${statement}`
      )
      expect(messageBuilder.createStatementMessage(statement)).toEqual(expected)
    })
  })

  describe('createHypothesesMessage', () => {
    it('should create a properly formatted hypotheses message', () => {
      const hypotheses = 'Test hypothesis'
      const expected = createExpectedMessage(
        `Here are the hypotheses:\n${hypotheses}`
      )
      expect(messageBuilder.createHypothesesMessage(hypotheses)).toEqual(
        expected
      )
    })
  })

  describe('createRegionMessage', () => {
    it('should create a properly formatted region message', () => {
      const region = 'North America'
      const expected = createExpectedMessage(`Region:\n${region}`)
      expect(messageBuilder.createRegionMessage(region)).toEqual(expected)
    })
  })

  describe('createProductTypeMessage', () => {
    it('should create a properly formatted product type message', () => {
      const productType = 'SaaS'
      const expected = createExpectedMessage(`Product Type:\n${productType}`)
      expect(messageBuilder.createProductTypeMessage(productType)).toEqual(
        expected
      )
    })
  })

  describe('createStageMessage', () => {
    it('should create a properly formatted stage message', () => {
      const stage = 'Development'
      const expected = createExpectedMessage(`Stage:\n${stage}`)
      expect(messageBuilder.createStageMessage(stage)).toEqual(expected)
    })
  })
})
