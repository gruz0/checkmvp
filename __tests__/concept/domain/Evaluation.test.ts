import { AssumptionsAnalysis } from '@/concept/domain/AssumptionsAnalysis'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'
import { ValidationPlan } from '@/concept/domain/ValidationPlan'

describe('Evaluation Class', () => {
  const validTargetAudience = [
    TargetAudience.New(
      'Developers',
      'Professional software developers',
      ['Time management', 'Code quality'],
      ValidationMetrics.New('Large', 8, 9, 7)
    ),
  ]

  const validClarityScore = ClarityScore.New(8, {
    problemClarity: 8,
    targetAudienceClarity: 7,
    scopeDefinition: 9,
    valuePropositionClarity: 8,
  })

  const validLanguageAnalysis = LanguageAnalysis.New(
    ['maybe', 'somehow'],
    ['target market size'],
    ['it should work well']
  )

  const validAssumptionsAnalysis = AssumptionsAnalysis.New(
    ['Core assumption'],
    1,
    'low',
    ['Validation method']
  )

  const validHypothesisFramework = HypothesisFramework.New('Format', [
    'Example 1',
    'Example 2',
  ])

  const validValidationPlan = ValidationPlan.New(
    ['Quick win 1', 'Quick win 2'],
    ['Medium effort 1', 'Medium effort 2'],
    ['Deep dive 1', 'Deep dive 2'],
    ['Success criteria 1', 'Success criteria 2']
  )

  describe('Creation of Evaluation', () => {
    describe('well-defined status', () => {
      it('should create an Evaluation instance with well-defined status', () => {
        const evaluation = Evaluation.New(
          'well-defined',
          [], // suggestions not required
          [], // recommendations not required
          ['Time management is a critical issue'],
          'Market exists and is growing',
          validTargetAudience,
          validClarityScore,
          validLanguageAnalysis,
          validAssumptionsAnalysis,
          validHypothesisFramework,
          validValidationPlan
        )

        expect(evaluation).toBeInstanceOf(Evaluation)
        expect(evaluation.getStatus()).toBe('well-defined')
        expect(evaluation.getPainPoints()).toEqual([
          'Time management is a critical issue',
        ])
        expect(evaluation.getMarketExistence()).toBe(
          'Market exists and is growing'
        )
        expect(evaluation.getTargetAudience()).toEqual(validTargetAudience)
      })

      it('should throw error when pain points are empty', () => {
        expect(() => {
          Evaluation.New(
            'well-defined',
            [],
            [],
            [], // empty pain points
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Pain points for well-defined must not be empty')
      })

      it('should throw error when market existence is empty', () => {
        expect(() => {
          Evaluation.New(
            'well-defined',
            [],
            [],
            ['Valid pain point'],
            '', // empty market existence
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Market existence for well-defined must not be empty')
      })

      it('should throw error when target audience is empty', () => {
        expect(() => {
          Evaluation.New(
            'well-defined',
            [],
            [],
            ['Valid pain point'],
            'Market exists',
            [], // empty target audience
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Target audience for well-defined must not be empty')
      })

      it('should throw error when assumptions analysis is null', () => {
        expect(() => {
          Evaluation.New(
            'well-defined',
            [],
            [],
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            null, // null assumptions analysis
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Assumptions analysis for well-defined must not be empty')
      })

      it('should throw error when hypothesis framework is null', () => {
        expect(() => {
          Evaluation.New(
            'well-defined',
            [],
            [],
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            null, // null hypothesis framework
            validValidationPlan
          )
        }).toThrow('Hypothesis framework for well-defined must not be empty')
      })

      it('should throw error when validation plan is null', () => {
        expect(() => {
          Evaluation.New(
            'well-defined',
            [],
            [],
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            null // null validation plan
          )
        }).toThrow('Validation plan for well-defined must not be empty')
      })
    })

    describe('requires_changes status', () => {
      it('should create an Evaluation instance with requires_changes status', () => {
        const evaluation = Evaluation.New(
          'requires_changes',
          ['Clarify the problem statement'],
          ['Focus on specific market segment'],
          ['Unclear value proposition'],
          'Market exists', // optional for requires_changes
          validTargetAudience,
          validClarityScore,
          validLanguageAnalysis,
          validAssumptionsAnalysis,
          validHypothesisFramework,
          validValidationPlan
        )

        expect(evaluation).toBeInstanceOf(Evaluation)
        expect(evaluation.getStatus()).toBe('requires_changes')
        expect(evaluation.getSuggestions()).toEqual([
          'Clarify the problem statement',
        ])
        expect(evaluation.getRecommendations()).toEqual([
          'Focus on specific market segment',
        ])
        expect(evaluation.getPainPoints()).toEqual([
          'Unclear value proposition',
        ])
      })

      it('should throw error when suggestions are empty', () => {
        expect(() => {
          Evaluation.New(
            'requires_changes',
            [], // empty suggestions
            ['Valid recommendation'],
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Suggestions for requires_changes must not be empty')
      })

      it('should throw error when recommendations are empty', () => {
        expect(() => {
          Evaluation.New(
            'requires_changes',
            ['Valid suggestion'],
            [], // empty recommendations
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Recommendations for requires_changes must not be empty')
      })

      it('should throw error when pain points are empty', () => {
        expect(() => {
          Evaluation.New(
            'requires_changes',
            ['Valid suggestion'],
            ['Valid recommendation'],
            [], // empty pain points
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Pain points for requires_changes must not be empty')
      })

      it('should throw error when target audience is empty', () => {
        expect(() => {
          Evaluation.New(
            'requires_changes',
            ['Valid suggestion'],
            ['Valid recommendation'],
            ['Valid pain point'],
            'Market exists',
            [], // empty target audience
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow('Target audience for requires_changes must not be empty')
      })

      it('should throw error when assumptions analysis is null', () => {
        expect(() => {
          Evaluation.New(
            'requires_changes',
            ['Valid suggestion'],
            ['Valid recommendation'],
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            null, // null assumptions analysis
            validHypothesisFramework,
            validValidationPlan
          )
        }).toThrow(
          'Assumptions analysis for requires_changes must not be empty'
        )
      })

      it('should throw error when hypothesis framework is null', () => {
        expect(() => {
          Evaluation.New(
            'requires_changes',
            ['Valid suggestion'],
            ['Valid recommendation'],
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            null, // null hypothesis framework
            validValidationPlan
          )
        }).toThrow(
          'Hypothesis framework for requires_changes must not be empty'
        )
      })

      it('should throw error when validation plan is null', () => {
        expect(() => {
          Evaluation.New(
            'requires_changes',
            ['Valid suggestion'],
            ['Valid recommendation'],
            ['Valid pain point'],
            'Market exists',
            validTargetAudience,
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis,
            validHypothesisFramework,
            null // null validation plan
          )
        }).toThrow('Validation plan for requires_changes must not be empty')
      })
    })

    describe('not-well-defined status', () => {
      it('should create an Evaluation instance with not-well-defined status', () => {
        const evaluation = Evaluation.New(
          'not-well-defined',
          ['Completely rewrite the problem statement'],
          [], // must be empty for not-well-defined
          [], // must be empty for not-well-defined
          '', // must be empty for not-well-defined
          [], // must be empty for not-well-defined
          validClarityScore,
          validLanguageAnalysis,
          null,
          null,
          null
        )

        expect(evaluation).toBeInstanceOf(Evaluation)
        expect(evaluation.getStatus()).toBe('not-well-defined')
        expect(evaluation.getSuggestions()).toEqual([
          'Completely rewrite the problem statement',
        ])
        expect(evaluation.getRecommendations()).toEqual([])
        expect(evaluation.getPainPoints()).toEqual([])
        expect(evaluation.getMarketExistence()).toBe('')
        expect(evaluation.getTargetAudience()).toEqual([])
      })

      it('should throw error when suggestions are empty', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            [], // empty suggestions
            [],
            [],
            '',
            [],
            validClarityScore,
            validLanguageAnalysis,
            null,
            null,
            null
          )
        }).toThrow('Suggestions for not-well-defined must not be empty')
      })

      it('should throw error when recommendations are not empty', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            ['Valid suggestion'],
            ['Invalid recommendation'], // should be empty
            [],
            '',
            [],
            validClarityScore,
            validLanguageAnalysis,
            null,
            null,
            null
          )
        }).toThrow('Recommendations for not-well-defined must be empty')
      })

      it('should throw error when pain points are not empty', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            ['Valid suggestion'],
            [],
            ['Invalid pain point'], // should be empty
            '',
            [],
            validClarityScore,
            validLanguageAnalysis,
            null,
            null,
            null
          )
        }).toThrow('Pain points for not-well-defined must be empty')
      })

      it('should throw error when market existence is not empty', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            ['Valid suggestion'],
            [],
            [],
            'Invalid market existence', // should be empty
            [],
            validClarityScore,
            validLanguageAnalysis,
            null,
            null,
            null
          )
        }).toThrow('Market existence for not-well-defined must be empty')
      })

      it('should throw error when target audience is not empty', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            ['Valid suggestion'],
            [],
            [],
            '',
            validTargetAudience, // should be empty
            validClarityScore,
            validLanguageAnalysis,
            null,
            null,
            null
          )
        }).toThrow('Target audience for not-well-defined must be empty')
      })

      it('should throw error when assumptions analysis is not null', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            ['Valid suggestion'],
            [],
            [],
            '',
            [],
            validClarityScore,
            validLanguageAnalysis,
            validAssumptionsAnalysis, // should be null
            null,
            null
          )
        }).toThrow('Assumptions analysis for not-well-defined must be empty')
      })

      it('should throw error when hypothesis framework is not null', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            ['Valid suggestion'],
            [],
            [],
            '',
            [],
            validClarityScore,
            validLanguageAnalysis,
            null,
            validHypothesisFramework, // should be null
            null
          )
        }).toThrow('Hypothesis framework for not-well-defined must be empty')
      })

      it('should throw error when validation plan is not null', () => {
        expect(() => {
          Evaluation.New(
            'not-well-defined',
            ['Valid suggestion'],
            [],
            [],
            '',
            [],
            validClarityScore,
            validLanguageAnalysis,
            null,
            null,
            validValidationPlan // should be null
          )
        }).toThrow('Validation plan for not-well-defined must be empty')
      })
    })

    it('should throw error for invalid status', () => {
      expect(() => {
        Evaluation.New(
          'invalid-status' as any,
          [],
          [],
          [],
          '',
          [],
          validClarityScore,
          validLanguageAnalysis,
          null,
          null,
          null
        )
      }).toThrow('Unsupported status: invalid-status')
    })
  })

  describe('Getter Methods', () => {
    let evaluation: Evaluation

    beforeEach(() => {
      evaluation = Evaluation.New(
        'well-defined',
        ['Suggestion'],
        ['Recommendation'],
        ['Pain point'],
        'Market exists',
        validTargetAudience,
        validClarityScore,
        validLanguageAnalysis,
        validAssumptionsAnalysis,
        validHypothesisFramework,
        validValidationPlan
      )
    })

    it('should return correct status', () => {
      expect(evaluation.getStatus()).toBe('well-defined')
    })

    it('should return correct suggestions', () => {
      expect(evaluation.getSuggestions()).toEqual(['Suggestion'])
    })

    it('should return correct recommendations', () => {
      expect(evaluation.getRecommendations()).toEqual(['Recommendation'])
    })

    it('should return correct pain points', () => {
      expect(evaluation.getPainPoints()).toEqual(['Pain point'])
    })

    it('should return correct market existence', () => {
      expect(evaluation.getMarketExistence()).toBe('Market exists')
    })

    it('should return correct target audience', () => {
      expect(evaluation.getTargetAudience()).toEqual(validTargetAudience)
    })

    it('should return correct clarity score', () => {
      expect(evaluation.getClarityScore()).toEqual(validClarityScore)
    })

    it('should return correct language analysis', () => {
      expect(evaluation.getLanguageAnalysis()).toEqual(validLanguageAnalysis)
    })

    it('should return correct assumptions analysis', () => {
      expect(evaluation.getAssumptionsAnalysis()).toEqual(
        validAssumptionsAnalysis
      )
    })

    it('should return correct hypothesis framework', () => {
      expect(evaluation.getHypothesisFramework()).toEqual(
        validHypothesisFramework
      )
    })

    it('should return correct validation plan', () => {
      expect(evaluation.getValidationPlan()).toEqual(validValidationPlan)
    })
  })
})
