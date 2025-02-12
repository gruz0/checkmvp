import { Identity } from '@/common/domain/Identity'
import { FixedTimeProvider, TimeProvider } from '@/common/domain/TimeProvider'
import { Concept } from '@/concept/domain/Aggregate'
import { Service } from '@/concept/domain/anonymization/AnonymizationService'
import { NotWellDefinedEvaluationFactory } from '../../domain/NotWellDefinedEvaluationFactory'
import { RequiresChangesEvaluationFactory } from '../../domain/RequiresChangesEvaluationFactory'
import { WellDefinedEvaluationFactory } from '../../domain/WellDefinedEvaluationFactory'

describe('AnonymizationService', () => {
  let service: Service
  let timeProvider: TimeProvider
  const problem =
    'Long problem description that fits the criteria and is long enough to pass the validation'
  const persona =
    'Persona that satisfies the criteria and is long enough to pass the validation'
  const productType = 'b2c'
  const stage = 'idea'

  beforeEach(() => {
    service = new Service()
    timeProvider = new FixedTimeProvider(new Date('2024-01-01'))
  })

  it('should return already anonymized concept without changes', () => {
    const concept = Concept.New(
      Identity.Generate().getValue(),
      problem,
      persona,
      'worldwide',
      productType,
      stage,
      30,
      timeProvider,
      new Date('2024-01-01')
    )
    concept.anonymize()

    const result = service.anonymizeConcept(concept)
    expect(result).toBe(concept)
  })

  it('should anonymize concept with not well defined evaluation', () => {
    const concept = Concept.New(
      Identity.Generate().getValue(),
      problem,
      persona,
      'worldwide',
      productType,
      stage,
      30,
      timeProvider,
      new Date('2024-01-01')
    )
    concept.evaluate(NotWellDefinedEvaluationFactory.New())

    const result = service.anonymizeConcept(concept)

    expect(result.getProblem().getValue()).toBe(
      'This problem has been anonymized and is no longer available for public view.'
    )
    expect(result.getPersona().getValue()).toBe(
      'This persona has been anonymized and is no longer available for public view.'
    )
    expect(result.getProductType().getValue()).toBe(productType)
    expect(result.getStage().getValue()).toBe(stage)
    expect(result.isAnonymized()).toBeTrue()

    const evaluation = result.getEvaluation()
    expect(evaluation.getStatus()).toBe('not-well-defined')
    expect(evaluation.getSuggestions()).toEqual([
      '[REDACTED]',
      '[REDACTED]',
      '[REDACTED]',
    ])
    expect(evaluation.getRecommendations()).toEqual([])
    expect(evaluation.getPainPoints()).toEqual([])
    expect(evaluation.getMarketExistence()).toBe('')
    expect(evaluation.getTargetAudience()).toEqual([])
    expect(evaluation.getClarityScore()).toEqual({
      overallScore: 1,
      metrics: {
        problemClarity: 1,
        targetAudienceClarity: 1,
        scopeDefinition: 1,
        valuePropositionClarity: 1,
      },
    })
    expect(evaluation.getLanguageAnalysis()).toEqual({
      vagueTerms: ['[REDACTED]', '[REDACTED]', '[REDACTED]', '[REDACTED]'],
      missingContext: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
      ambiguousStatements: ['[REDACTED]', '[REDACTED]'],
    })
    expect(evaluation.getAssumptionsAnalysis()).toBeNull()
    expect(evaluation.getHypothesisFramework()).toBeNull()
    expect(evaluation.getValidationPlan()).toBeNull()
  })

  it('should anonymize concept with requires changes evaluation', () => {
    const concept = Concept.New(
      Identity.Generate().getValue(),
      problem,
      persona,
      'worldwide',
      productType,
      stage,
      30,
      timeProvider,
      new Date('2024-01-01')
    )
    concept.evaluate(RequiresChangesEvaluationFactory.New())

    const result = service.anonymizeConcept(concept)

    expect(result.getProblem().getValue()).toBe(
      'This problem has been anonymized and is no longer available for public view.'
    )
    expect(result.getPersona().getValue()).toBe(
      'This persona has been anonymized and is no longer available for public view.'
    )
    expect(result.getProductType().getValue()).toBe(productType)
    expect(result.getStage().getValue()).toBe(stage)
    expect(result.isAnonymized()).toBeTrue()

    const evaluation = result.getEvaluation()
    expect(evaluation.getStatus()).toBe('requires_changes')
    expect(evaluation.getSuggestions()).toEqual([
      '[REDACTED]',
      '[REDACTED]',
      '[REDACTED]',
    ])
    expect(evaluation.getRecommendations()).toEqual([
      '[REDACTED]',
      '[REDACTED]',
    ])
    expect(evaluation.getPainPoints()).toEqual(['[REDACTED]'])
    expect(evaluation.getMarketExistence()).toBe('[REDACTED]')
    expect(evaluation.getTargetAudience()).toEqual([
      {
        segment: '[REDACTED]',
        description: '[REDACTED]',
        challenges: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
        validationMetrics: {
          marketSize: '[REDACTED]',
          accessibility: 1,
          painPointIntensity: 1,
          willingnessToPay: 1,
        },
      },
    ])
    expect(evaluation.getAssumptionsAnalysis()).toEqual({
      coreAssumptions: ['[REDACTED]', '[REDACTED]', '[REDACTED]', '[REDACTED]'],
      testability: 1,
      riskLevel: 'high',
      validationMethods: [
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
      ],
    })
    expect(evaluation.getHypothesisFramework()).toEqual({
      statement: '[REDACTED]',
      hypotheses: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
    })
    expect(evaluation.getValidationPlan()).toEqual({
      quickWins: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
      mediumEffort: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
      deepDive: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
      successCriteria: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
    })
  })

  it('should anonymize concept with well defined evaluation', () => {
    const concept = Concept.New(
      Identity.Generate().getValue(),
      problem,
      persona,
      'worldwide',
      productType,
      stage,
      30,
      timeProvider,
      new Date('2024-01-01')
    )
    concept.evaluate(WellDefinedEvaluationFactory.New())

    const result = service.anonymizeConcept(concept)

    expect(result.getProblem().getValue()).toBe(
      'This problem has been anonymized and is no longer available for public view.'
    )
    expect(result.getPersona().getValue()).toBe(
      'This persona has been anonymized and is no longer available for public view.'
    )
    expect(result.getProductType().getValue()).toBe(productType)
    expect(result.getStage().getValue()).toBe(stage)
    expect(result.isAnonymized()).toBeTrue()

    const evaluation = result.getEvaluation()
    expect(evaluation.getStatus()).toBe('well-defined')
    expect(evaluation.getSuggestions()).toEqual([])
    expect(evaluation.getRecommendations()).toEqual([])
    expect(evaluation.getPainPoints()).toEqual([
      '[REDACTED]',
      '[REDACTED]',
      '[REDACTED]',
    ])
    expect(evaluation.getMarketExistence()).toBe('[REDACTED]')
    expect(evaluation.getTargetAudience()).toEqual([
      {
        segment: '[REDACTED]',
        description: '[REDACTED]',
        challenges: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
        validationMetrics: {
          marketSize: '[REDACTED]',
          accessibility: 1,
          painPointIntensity: 1,
          willingnessToPay: 1,
        },
      },
      {
        segment: '[REDACTED]',
        description: '[REDACTED]',
        challenges: ['[REDACTED]', '[REDACTED]'],
        validationMetrics: {
          marketSize: '[REDACTED]',
          accessibility: 1,
          painPointIntensity: 1,
          willingnessToPay: 1,
        },
      },
    ])
    expect(evaluation.getAssumptionsAnalysis()).toEqual({
      coreAssumptions: [
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
      ],
      testability: 1,
      riskLevel: 'medium',
      validationMethods: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
    })
    expect(evaluation.getHypothesisFramework()).toEqual({
      statement: '[REDACTED]',
      hypotheses: ['[REDACTED]', '[REDACTED]', '[REDACTED]', '[REDACTED]'],
    })
    expect(evaluation.getValidationPlan()).toEqual({
      quickWins: ['[REDACTED]', '[REDACTED]', '[REDACTED]', '[REDACTED]'],
      mediumEffort: [
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
        '[REDACTED]',
      ],
      deepDive: ['[REDACTED]', '[REDACTED]', '[REDACTED]', '[REDACTED]'],
      successCriteria: ['[REDACTED]', '[REDACTED]', '[REDACTED]', '[REDACTED]'],
    })
  })

  it('should anonymize accepted concept', () => {
    const concept = Concept.New(
      Identity.Generate().getValue(),
      problem,
      persona,
      'worldwide',
      productType,
      stage,
      30,
      timeProvider,
      new Date('2024-01-01')
    )

    concept.evaluate(WellDefinedEvaluationFactory.New())

    const ideaId = Identity.Generate()
    concept.accept(ideaId)

    const result = service.anonymizeConcept(concept)

    expect(result.getProblem().getValue()).toBe(
      'This problem has been anonymized and is no longer available for public view.'
    )
    expect(result.getPersona().getValue()).toBe(
      'This persona has been anonymized and is no longer available for public view.'
    )
    expect(result.getProductType().getValue()).toBe(productType)
    expect(result.getStage().getValue()).toBe(stage)
    expect(result.isAnonymized()).toBeTrue()
    expect(result.wasAccepted()).toBeTrue()
    expect(result.getIdeaId()).toBe(ideaId)
  })

  it('should anonymize archived concept', () => {
    const concept = Concept.New(
      Identity.Generate().getValue(),
      problem,
      persona,
      'worldwide',
      productType,
      stage,
      30,
      timeProvider,
      new Date('2024-01-01')
    )
    concept.evaluate(WellDefinedEvaluationFactory.New())
    concept.accept(Identity.Generate())
    concept.archive()

    const result = service.anonymizeConcept(concept)

    expect(result.getProblem().getValue()).toBe(
      'This problem has been anonymized and is no longer available for public view.'
    )
    expect(result.getPersona().getValue()).toBe(
      'This persona has been anonymized and is no longer available for public view.'
    )
    expect(result.getProductType().getValue()).toBe(productType)
    expect(result.getStage().getValue()).toBe(stage)
    expect(result.isAnonymized()).toBeTrue()
    expect(result.wasArchived()).toBeTrue()
  })

  it('should anonymize concept with language analysis containing data', () => {
    const concept = Concept.New(
      Identity.Generate().getValue(),
      problem,
      persona,
      'worldwide',
      productType,
      stage,
      30,
      timeProvider,
      new Date('2024-01-01')
    )

    concept.evaluate(RequiresChangesEvaluationFactory.New())

    const result = service.anonymizeConcept(concept)

    const languageAnalysis = result.getEvaluation().getLanguageAnalysis()
    expect(languageAnalysis.getVagueTerms()).toEqual([
      '[REDACTED]',
      '[REDACTED]',
      '[REDACTED]',
    ])
    expect(languageAnalysis.getMissingContext()).toEqual([
      '[REDACTED]',
      '[REDACTED]',
    ])
    expect(languageAnalysis.getAmbiguousStatements()).toEqual([
      '[REDACTED]',
      '[REDACTED]',
    ])
  })
})
