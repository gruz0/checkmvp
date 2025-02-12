import OpenAI from 'openai'
import { ConceptEvaluator } from '@/concept/adapters/OpenAIService/ConceptEvaluator'

// Mock dependencies
jest.mock('@sentry/nextjs')
jest.mock('openai')

describe('ConceptEvaluator', () => {
  let evaluator: ConceptEvaluator
  const mockApiKey = 'test-api-key'
  const mockConceptId = 'test-concept-id'
  const mockProblem = 'test problem'
  const mockPersona = 'test persona'
  const mockRegion = 'worldwide'
  const mockProductType = 'b2b'
  const mockStage = 'idea'

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    // Create mock response
    const mockResponse = {
      choices: [
        {
          message: {
            parsed: {
              problem_evaluation: {
                status: 'well-defined' as const,
                suggestions: [
                  'Good suggestion',
                  '',
                  '   ',
                  'Another suggestion',
                ],
                recommendations: ['Recommendation 1', '', 'Recommendation 2'],
                pain_points: ['Pain point 1', '   ', 'Pain point 2'],
                market_existence: {
                  market_size_and_growth_trends: 'Market trends',
                  existing_solutions_and_competitors: 'Competitors',
                  market_gaps_and_opportunities: 'Gaps',
                  target_users: 'Users',
                  challenges_and_barriers_to_entry: 'Challenges',
                },
                target_audience: [
                  {
                    segment: 'Segment 1',
                    description: 'Description 1',
                    challenges: ['Challenge 1', '', '   ', 'Challenge 2'],
                    validation_metrics: {
                      market_size: 'Large',
                      accessibility: 8,
                      pain_point_intensity: 7,
                      willingness_to_pay: 6,
                    },
                  },
                ],
                clarity_score: {
                  overall_score: 8,
                  metrics: {
                    problem_clarity: 9,
                    target_audience_clarity: 8,
                    scope_definition: 7,
                    value_proposition_clarity: 8,
                  },
                },
                language_analysis: {
                  vague_terms: ['Term 1', '', 'Term 2'],
                  missing_context: ['Context 1', '   ', 'Context 2'],
                  ambiguous_statements: ['Statement 1', '', 'Statement 2'],
                },
                assumptions_analysis: {
                  core_assumptions: ['Core assumption'],
                  testability: 1,
                  risk_level: 'low',
                  validation_methods: ['Validation method'],
                },
                hypothesis_framework: {
                  format: 'Format',
                  examples: ['Example 1', 'Example 2'],
                },
                validation_plan: {
                  quick_wins: ['Quick win 1', 'Quick win 2'],
                  medium_effort: ['Medium effort 1', 'Medium effort 2'],
                },
              },
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

    evaluator = new ConceptEvaluator(mockApiKey)
  })

  describe('evaluateConcept', () => {
    it('should clean empty strings from array responses and maintain all other fields', async () => {
      const result = await evaluator.evaluateConcept(
        mockConceptId,
        mockProblem,
        mockPersona,
        mockRegion,
        mockProductType,
        mockStage
      )

      // Test status
      expect(result.status).toBe('well-defined')

      // Test array cleaning
      expect(result.suggestions).toEqual([
        'Good suggestion',
        'Another suggestion',
      ])
      expect(result.recommendations).toEqual([
        'Recommendation 1',
        'Recommendation 2',
      ])
      expect(result.painPoints).toEqual(['Pain point 1', 'Pain point 2'])

      // Test market existence fields
      expect(result.marketExistence).toContain(
        '📈 Market Size and Growth Trends:\n\nMarket trends'
      )
      expect(result.marketExistence).toContain(
        '🏆 Existing Solutions and Competitors:\n\nCompetitors'
      )
      expect(result.marketExistence).toContain(
        '💡 Market Gaps and Opportunities:\n\nGaps'
      )
      expect(result.marketExistence).toContain('🎯 Target Users:\n\nUsers')
      expect(result.marketExistence).toContain(
        '🧱 Challenges and Barriers to Entry:\n\nChallenges'
      )

      // Test target audience
      expect(result.targetAudience).toHaveLength(1)
      const audience = result.targetAudience[0]
      expect(audience.segment).toBe('Segment 1')
      expect(audience.description).toBe('Description 1')
      expect(audience.challenges).toEqual(['Challenge 1', 'Challenge 2'])

      // Test validation metrics
      expect(audience.validationMetrics).toEqual({
        marketSize: 'Large',
        accessibility: 8,
        painPointIntensity: 7,
        willingnessToPay: 6,
      })

      // Test clarity score
      expect(result.clarityScore).toEqual({
        overallScore: 8,
        metrics: {
          problemClarity: 9,
          targetAudienceClarity: 8,
          scopeDefinition: 7,
          valuePropositionClarity: 8,
        },
      })

      // Test language analysis
      expect(result.languageAnalysis).toEqual({
        vagueTerms: ['Term 1', 'Term 2'],
        missingContext: ['Context 1', 'Context 2'],
        ambiguousStatements: ['Statement 1', 'Statement 2'],
      })

      // Test that market existence string is properly formatted
      const marketExistenceParts = result.marketExistence.split('\n\n')
      expect(marketExistenceParts).toHaveLength(10)
      expect(marketExistenceParts[0]).toStartWith('📈')
      expect(marketExistenceParts[2]).toStartWith('🏆')
      expect(marketExistenceParts[4]).toStartWith('💡')
      expect(marketExistenceParts[6]).toStartWith('🎯')
      expect(marketExistenceParts[8]).toStartWith('🧱')
    })

    it('should handle not-well-defined status with empty arrays', async () => {
      // Mock response for not-well-defined case
      const notWellDefinedResponse = {
        choices: [
          {
            message: {
              parsed: {
                problem_evaluation: {
                  status: 'not-well-defined' as const,
                  suggestions: ['Fix this issue'],
                  recommendations: [],
                  pain_points: [],
                  market_existence: '',
                  target_audience: [],
                  clarity_score: {
                    overall_score: 0,
                    metrics: {
                      problem_clarity: 0,
                      target_audience_clarity: 0,
                      scope_definition: 0,
                      value_proposition_clarity: 0,
                    },
                  },
                  language_analysis: {
                    vague_terms: [],
                    missing_context: [],
                    ambiguous_statements: [],
                  },
                },
              },
              refusal: null,
            },
          },
        ],
        usage: { total_tokens: 100 },
      }

      // Update mock for this test
      const mockParse = jest.fn().mockResolvedValue(notWellDefinedResponse)
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

      evaluator = new ConceptEvaluator(mockApiKey)

      const result = await evaluator.evaluateConcept(
        mockConceptId,
        mockProblem,
        mockPersona,
        mockRegion,
        mockProductType,
        mockStage
      )

      // Verify not-well-defined response
      expect(result.status).toBe('not-well-defined')
      expect(result.suggestions).toEqual(['Fix this issue'])
      expect(result.recommendations).toEqual([])
      expect(result.painPoints).toEqual([])
      expect(result.marketExistence).toBe('')
      expect(result.targetAudience).toEqual([])
      expect(result.clarityScore).toEqual({
        overallScore: 0,
        metrics: {
          problemClarity: 0,
          targetAudienceClarity: 0,
          scopeDefinition: 0,
          valuePropositionClarity: 0,
        },
      })
      expect(result.languageAnalysis).toEqual({
        vagueTerms: [],
        missingContext: [],
        ambiguousStatements: [],
      })
    })

    it('should handle requires_changes status correctly', async () => {
      const requiresChangesResponse = {
        choices: [
          {
            message: {
              parsed: {
                problem_evaluation: {
                  status: 'requires_changes' as const,
                  suggestions: ['Make these changes'],
                  recommendations: ['Recommendation'],
                  pain_points: ['Pain point'],
                  market_existence: {
                    market_size_and_growth_trends: 'Market trends',
                    existing_solutions_and_competitors: 'Competitors',
                    market_gaps_and_opportunities: 'Gaps',
                    target_users: 'Users',
                    challenges_and_barriers_to_entry: 'Challenges',
                  },
                  target_audience: [
                    {
                      segment: 'Segment 1',
                      description: 'Description 1',
                      challenges: ['Challenge'],
                      validation_metrics: {
                        market_size: 'Medium',
                        accessibility: 5,
                        pain_point_intensity: 6,
                        willingness_to_pay: 4,
                      },
                    },
                  ],
                  clarity_score: {
                    overall_score: 5,
                    metrics: {
                      problem_clarity: 5,
                      target_audience_clarity: 5,
                      scope_definition: 5,
                      value_proposition_clarity: 5,
                    },
                  },
                  language_analysis: {
                    vague_terms: ['Term'],
                    missing_context: ['Context'],
                    ambiguous_statements: ['Statement'],
                  },
                  assumptions_analysis: {
                    core_assumptions: ['Core assumption'],
                    testability: 1,
                    risk_level: 'low',
                    validation_methods: ['Validation method'],
                  },
                  hypothesis_framework: {
                    format: 'Format',
                    examples: ['Example 1', 'Example 2'],
                  },
                  validation_plan: {
                    quick_wins: ['Quick win 1', 'Quick win 2'],
                    medium_effort: ['Medium effort 1', 'Medium effort 2'],
                  },
                },
              },
              refusal: null,
            },
          },
        ],
        usage: { total_tokens: 100 },
      }

      const mockParse = jest.fn().mockResolvedValue(requiresChangesResponse)
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

      evaluator = new ConceptEvaluator(mockApiKey)
      const result = await evaluator.evaluateConcept(
        mockConceptId,
        mockProblem,
        mockPersona,
        mockRegion,
        mockProductType,
        mockStage
      )

      expect(result.status).toBe('requires_changes')
      // Verify all fields are present and correctly transformed
      expect(result.suggestions).toEqual(['Make these changes'])
      expect(result.recommendations).toEqual(['Recommendation'])
      expect(result.painPoints).toEqual(['Pain point'])
      expect(result.targetAudience).toHaveLength(1)
      // ... verify other fields ...
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

      evaluator = new ConceptEvaluator(mockApiKey)

      await expect(
        evaluator.evaluateConcept(
          mockConceptId,
          mockProblem,
          mockPersona,
          mockRegion,
          mockProductType,
          mockStage
        )
      ).rejects.toThrow('API Error')
    })

    it('should handle invalid response format', async () => {
      const invalidResponse = {
        choices: [
          {
            message: {
              parsed: {
                invalid_field: 'invalid',
              },
              refusal: null,
            },
          },
        ],
      }

      const mockParse = jest.fn().mockResolvedValue(invalidResponse)
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

      evaluator = new ConceptEvaluator(mockApiKey)

      await expect(
        evaluator.evaluateConcept(
          mockConceptId,
          mockProblem,
          mockPersona,
          mockRegion,
          mockProductType,
          mockStage
        )
      ).rejects.toThrow()
    })

    it('should capture errors in Sentry', async () => {
      const Sentry = require('@sentry/nextjs')
      const mockError = new Error('Test Error')
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

      evaluator = new ConceptEvaluator(mockApiKey)

      await expect(
        evaluator.evaluateConcept(
          mockConceptId,
          mockProblem,
          mockPersona,
          mockRegion,
          mockProductType,
          mockStage
        )
      ).rejects.toThrow('Test Error')

      expect(Sentry.captureException).toHaveBeenCalledWith(mockError)
    })

    it('should handle empty market existence data', async () => {
      const responseWithEmptyMarketExistence = {
        choices: [
          {
            message: {
              parsed: {
                problem_evaluation: {
                  status: 'well-defined' as const,
                  suggestions: ['Suggestion'],
                  recommendations: ['Recommendation'],
                  pain_points: ['Pain point'],
                  market_existence: {},
                  target_audience: [],
                  clarity_score: {
                    overall_score: 5,
                    metrics: {
                      problem_clarity: 5,
                      target_audience_clarity: 5,
                      scope_definition: 5,
                      value_proposition_clarity: 5,
                    },
                  },
                  language_analysis: {
                    vague_terms: [],
                    missing_context: [],
                    ambiguous_statements: [],
                  },
                  assumptions_analysis: {
                    core_assumptions: ['Core assumption'],
                    testability: 1,
                    risk_level: 'low',
                    validation_methods: ['Validation method'],
                  },
                  hypothesis_framework: {
                    format: 'Format',
                    examples: ['Example 1', 'Example 2'],
                  },
                  validation_plan: {
                    quick_wins: ['Quick win 1', 'Quick win 2'],
                    medium_effort: ['Medium effort 1', 'Medium effort 2'],
                  },
                },
              },
              refusal: null,
            },
          },
        ],
        usage: { total_tokens: 100 },
      }

      const mockParse = jest
        .fn()
        .mockResolvedValue(responseWithEmptyMarketExistence)
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

      evaluator = new ConceptEvaluator(mockApiKey)
      const result = await evaluator.evaluateConcept(
        mockConceptId,
        mockProblem,
        mockPersona,
        mockRegion,
        mockProductType,
        mockStage
      )

      expect(result.marketExistence).toBe('')
    })
  })
})
