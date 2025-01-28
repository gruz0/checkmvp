import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { TargetAudiencesEvaluator } from '@/idea/adapters/OpenAIService/TargetAudiencesEvaluator'

// Mock dependencies
jest.mock('@sentry/nextjs')
jest.mock('openai')

describe('TargetAudiencesEvaluator', () => {
  let evaluator: TargetAudiencesEvaluator
  const mockApiKey = 'test-api-key'
  const mockProblem = 'Test problem description'
  const mockTargetAudiences = [
    {
      id: 'audience-1',
      segment: 'Segment 1',
      description: 'Description 1',
      challenges: ['Challenge 1', 'Challenge 2'],
    },
    {
      id: 'audience-2',
      segment: 'Segment 2',
      description: 'Description 2',
      challenges: ['Challenge 3'],
    },
  ]

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    // Create mock response
    const mockResponse = {
      choices: [
        {
          message: {
            parsed: {
              target_audiences: [
                {
                  id: 'audience-1',
                  why: 'Because reason 1',
                  pain_points: ['Pain 1', 'Pain 2'],
                  targeting_strategy: 'Strategy 1',
                },
                {
                  id: 'audience-2',
                  why: 'Because reason 2',
                  pain_points: ['Pain 3'],
                  targeting_strategy: 'Strategy 2',
                },
              ],
            },
            refusal: null,
          },
        },
      ],
      usage: { total_tokens: 100 },
    }

    // Mock OpenAI constructor and methods
    const mockParse = jest.fn().mockResolvedValue(mockResponse)
    const mockOpenAI = {
      beta: {
        chat: {
          completions: {
            parse: mockParse,
          },
        },
      },
    }
    ;(OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(
      () => mockOpenAI as any
    )

    evaluator = new TargetAudiencesEvaluator(mockApiKey)
  })

  describe('evaluateTargetAudience', () => {
    it('should successfully evaluate target audiences', async () => {
      const result = await evaluator.evaluateTargetAudiences(
        'idea-1',
        mockProblem,
        mockTargetAudiences
      )

      // Verify Sentry tags were set
      expect(Sentry.setTag).toHaveBeenCalledWith('component', 'AIService')
      expect(Sentry.setTag).toHaveBeenCalledWith(
        'ai_service_type',
        'TargetAudiencesEvaluator'
      )
      expect(Sentry.setTag).toHaveBeenCalledWith('idea_id', 'idea-1')

      // Verify OpenAI was called with correct parameters
      const openaiInstance = (OpenAI as jest.MockedClass<typeof OpenAI>).mock
        .results[0].value
      expect(openaiInstance.beta.chat.completions.parse).toHaveBeenCalledWith({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: `You are a product validation expert for startups helping users analyze the target audience for their product ideas.

Before proceeding with the analysis, ensure that the user inputs for **target audience description** are clear and sufficiently detailed.

### Important Instructions

- **Clarity First**: Focus on helping the user clarify their target audience for the product idea.
- **Tone**: Use a conversational tone, as if you're chatting with a friend.
- **Language**: Skip formal, sales-like language, and buzzwords such as: streamline, enhance, tailor, leverage, thrill, seamless, etc., in any form.
- **Value**: Ensure the language is clear, practical, and builds confidence in the product's value.

### Field guidelines

- **id** (string): The ID of the target audience, keep it from the input.
- **why** (string): Explain the importance of this target audience, including their demographics, motivations, and how they relate to the product.
- **pain_points** (array of strings): Identify specific challenges or issues faced by this audience that the product can address.
- **targeting_strategy** (string): Recommend ways to effectively target this audience based on their behaviors and preferences.`,
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Here is the problem my product aims to solve: """
Test problem description"""

Here are my potential target audiences: """
Segment ID: audience-1
Segment: Segment 1
Description: Description 1
Challenges: Challenge 1; Challenge 2


Segment ID: audience-2
Segment: Segment 2
Description: Description 2
Challenges: Challenge 3

"""`,
              },
            ],
          },
        ],
        top_p: 0.9,
        max_completion_tokens: 2000,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'target_audiences',
            schema: {
              type: 'object',
              required: ['target_audiences'],
              properties: {
                target_audiences: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: [
                      'id',
                      'why',
                      'pain_points',
                      'targeting_strategy',
                    ],
                    additionalProperties: false,
                    properties: {
                      id: {
                        type: 'string',
                      },
                      why: {
                        type: 'string',
                      },
                      pain_points: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                      targeting_strategy: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
              additionalProperties: false,
              $schema: 'http://json-schema.org/draft-07/schema#',
            },
            strict: true,
          },
        },
        n: 1,
      })

      // Verify Sentry breadcrumb was added
      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
        message: 'OpenAI TargetAudiencesEvaluator called',
        data: expect.objectContaining({
          model: 'gpt-4o-mini',
          top_p: 0.9,
          max_completion_tokens: 2000,
          usage: { total_tokens: 100 },
          choices: 1,
        }),
        level: 'info',
      })

      // Verify result structure
      expect(result).toEqual([
        {
          id: 'audience-1',
          why: 'Because reason 1',
          painPoints: ['Pain 1', 'Pain 2'],
          targetingStrategy: 'Strategy 1',
        },
        {
          id: 'audience-2',
          why: 'Because reason 2',
          painPoints: ['Pain 3'],
          targetingStrategy: 'Strategy 2',
        },
      ])
    })

    it('should throw error when message is refused', async () => {
      const mockRefusalResponse = {
        choices: [
          {
            message: {
              parsed: null,
              refusal: 'Content policy violation',
            },
          },
        ],
      }

      const mockParse = jest.fn().mockResolvedValue(mockRefusalResponse)
      const mockOpenAI = {
        beta: {
          chat: {
            completions: {
              parse: mockParse,
            },
          },
        },
      }
      ;(OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(
        () => mockOpenAI as any
      )

      evaluator = new TargetAudiencesEvaluator(mockApiKey)

      await expect(
        evaluator.evaluateTargetAudiences(
          'idea-1',
          mockProblem,
          mockTargetAudiences
        )
      ).rejects.toThrow('Message refusal: Content policy violation')

      expect(Sentry.captureException).toHaveBeenCalled()
    })

    it('should throw error when message is not parsed', async () => {
      const mockUnparsedResponse = {
        choices: [
          {
            message: {
              parsed: null,
              refusal: null,
            },
          },
        ],
      }

      const mockParse = jest.fn().mockResolvedValue(mockUnparsedResponse)
      const mockOpenAI = {
        beta: {
          chat: {
            completions: {
              parse: mockParse,
            },
          },
        },
      }
      ;(OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(
        () => mockOpenAI as any
      )

      evaluator = new TargetAudiencesEvaluator(mockApiKey)

      await expect(
        evaluator.evaluateTargetAudiences(
          'idea-1',
          mockProblem,
          mockTargetAudiences
        )
      ).rejects.toThrow('Message was not parsed')

      expect(Sentry.captureException).toHaveBeenCalled()
    })

    it('should handle OpenAI API errors', async () => {
      const mockError = new Error('API Error')
      const mockParse = jest.fn().mockRejectedValue(mockError)
      const mockOpenAI = {
        beta: {
          chat: {
            completions: {
              parse: mockParse,
            },
          },
        },
      }
      ;(OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(
        () => mockOpenAI as any
      )

      evaluator = new TargetAudiencesEvaluator(mockApiKey)

      await expect(
        evaluator.evaluateTargetAudiences(
          'idea-1',
          mockProblem,
          mockTargetAudiences
        )
      ).rejects.toThrow('API Error')

      expect(Sentry.captureException).toHaveBeenCalledWith(mockError)
    })

    it('should correctly build user message', async () => {
      await evaluator.evaluateTargetAudiences(
        'idea-1',
        mockProblem,
        mockTargetAudiences
      )

      const openaiInstance = (OpenAI as jest.MockedClass<typeof OpenAI>).mock
        .results[0].value
      const calls = openaiInstance.beta.chat.completions.parse.mock.calls[0][0]
      const userMessage = calls.messages[1].content[0].text

      expect(userMessage).toContain(mockProblem)
      expect(userMessage).toContain('Segment ID: audience-1')
      expect(userMessage).toContain('Segment: Segment 1')
      expect(userMessage).toContain('Description: Description 1')
      expect(userMessage).toContain('Challenges: Challenge 1; Challenge 2')
      expect(userMessage).toContain('Segment ID: audience-2')
    })
  })
})
