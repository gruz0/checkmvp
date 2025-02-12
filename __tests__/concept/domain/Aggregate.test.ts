import { Identity } from '@/common/domain/Identity'
import { Concept } from '@/concept/domain/Aggregate'
import { WellDefinedEvaluationFactory } from './WellDefinedEvaluationFactory'

describe('Concept Class', () => {
  let timeProvider: { now: jest.Mock }
  let validId: string
  let validProblem: string
  let validPersona: string
  let validRegion: string
  let validProductType: string
  let validStage: string
  let validExpiryPeriodInDays: number
  let currentDate: Date

  beforeEach(() => {
    validId = Identity.Generate().getValue()
    validProblem =
      'This is a valid problem statement that meets the minimum length requirement and provides meaningful context.'
    validPersona =
      'Software developers with extensive experience in building scalable applications and understanding of distributed systems architecture.'
    validRegion = 'worldwide'
    validProductType = 'b2c'
    validStage = 'idea'
    validExpiryPeriodInDays = 30
    currentDate = new Date('2024-01-01')

    timeProvider = {
      now: jest.fn().mockReturnValue(currentDate),
    }
  })

  describe('Creation of Concept', () => {
    it('should create a Concept instance with valid inputs', () => {
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider
      )

      expect(concept).toBeInstanceOf(Concept)
      expect(concept.getId().getValue()).toBe(validId)
      expect(concept.getProblem().getValue()).toBe(validProblem)
      expect(concept.getPersona().getValue()).toBe(validPersona)
      expect(concept.getRegion().getValue()).toBe(validRegion)
      expect(concept.getProductType().getValue()).toBe(validProductType)
      expect(concept.getStage().getValue()).toBe(validStage)
      expect(concept.isAvailable()).toBeTrue()
      expect(concept.isEvaluated()).toBeFalse()
      expect(concept.isAccepted()).toBeFalse()
      expect(concept.isArchived()).toBeFalse()
      expect(concept.isAnonymized()).toBeFalse()
      expect(concept.wasEvaluated()).toBeFalse()
      expect(concept.wasAccepted()).toBeFalse()
      expect(concept.wasArchived()).toBeFalse()
      expect(concept.wasAnonymized()).toBeFalse()
      expect(() => concept.getEvaluation()).toThrow(
        'Concept has not been evaluated yet'
      )
      expect(() => concept.getIdeaId()).toThrow(
        'Concept has not been accepted yet'
      )
    })

    it('should create a Concept with a specific creation date', () => {
      const specificDate = new Date('2024-01-01')
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider,
        specificDate
      )

      expect(concept.getCreatedAt()).toEqual(specificDate)
    })

    it('should throw error when created with negative expiry period', () => {
      expect(() =>
        Concept.New(
          validId,
          validProblem,
          validPersona,
          validRegion,
          validProductType,
          validStage,
          -1,
          timeProvider
        )
      ).toThrow('Expiry period must be positive')
    })

    it('should throw error when created with future date', () => {
      const futureDate = new Date('2030-01-01')
      expect(() =>
        Concept.New(
          validId,
          validProblem,
          validPersona,
          validRegion,
          validProductType,
          validStage,
          validExpiryPeriodInDays,
          timeProvider,
          futureDate
        )
      ).toThrow('Creation date cannot be in the future')
    })

    it('should throw error when created with invalid persona', () => {
      const shortPersona = 'Too short persona'

      expect(() =>
        Concept.New(
          validId,
          validProblem,
          shortPersona,
          validRegion,
          validProductType,
          validStage,
          validExpiryPeriodInDays,
          timeProvider
        )
      ).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when created with empty persona', () => {
      expect(() =>
        Concept.New(
          validId,
          validProblem,
          '',
          validRegion,
          validProductType,
          validStage,
          validExpiryPeriodInDays,
          timeProvider
        )
      ).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when created with whitespace-only persona', () => {
      expect(() =>
        Concept.New(
          validId,
          validProblem,
          '     ',
          validRegion,
          validProductType,
          validStage,
          validExpiryPeriodInDays,
          timeProvider
        )
      ).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when created with too long personas', () => {
      const longPersona = 'a'.repeat(2049)

      expect(() =>
        Concept.New(
          validId,
          validProblem,
          longPersona,
          validRegion,
          validProductType,
          validStage,
          validExpiryPeriodInDays,
          timeProvider
        )
      ).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })
  })

  describe('Availability Check', () => {
    it('should return false when concept is archived', () => {
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider
      )

      const evaluation = WellDefinedEvaluationFactory.New()
      concept.evaluate(evaluation)
      concept.accept(Identity.Generate())
      concept.archive()

      expect(concept.isAvailable()).toBeFalse()
    })

    it('should return false when concept is anonymized', () => {
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider
      )

      concept.anonymize()
      expect(concept.isAvailable()).toBeFalse()
    })

    it('should return true when concept is within expiry period', () => {
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider
      )

      timeProvider.now.mockReturnValue(new Date('2024-01-15')) // 15 days later
      expect(concept.isAvailable()).toBeTrue()
    })

    it('should return false when concept is past expiry period', () => {
      const specificDate = new Date('2024-01-01')
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider,
        specificDate
      )

      timeProvider.now.mockReturnValue(new Date('2024-02-01')) // 31 days later
      expect(concept.isAvailable()).toBeFalse()
    })
  })

  describe('State Transitions', () => {
    let concept: Concept

    beforeEach(() => {
      concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider
      )
    })

    describe('evaluate', () => {
      it('should transition from DRAFT to EVALUATED', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)

        expect(concept.isEvaluated()).toBeTrue()
        expect(concept.isAccepted()).toBeFalse()
        expect(concept.isArchived()).toBeFalse()
        expect(concept.isAnonymized()).toBeFalse()
        expect(concept.wasEvaluated()).toBeTrue()
        expect(concept.wasAccepted()).toBeFalse()
        expect(concept.wasArchived()).toBeFalse()
        expect(concept.wasAnonymized()).toBeFalse()
        expect(concept.getEvaluation()).toBe(evaluation)
      })

      it('should throw error when trying to evaluate from EVALUATED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)

        expect(() => {
          concept.evaluate(evaluation)
        }).toThrow('Invalid state transition from evaluated to evaluated')
      })

      it('should throw error when trying to evaluate from ACCEPTED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.accept(Identity.Generate())

        expect(() => {
          concept.evaluate(evaluation)
        }).toThrow('Invalid state transition from accepted to evaluated')
      })

      it('should throw error when trying to evaluate from ARCHIVED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.accept(Identity.Generate())
        concept.archive()

        expect(() => {
          concept.evaluate(evaluation)
        }).toThrow('Invalid state transition from archived to evaluated')
      })

      it('should throw error when trying to evaluate from ANONYMIZED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.anonymize()

        expect(() => {
          concept.evaluate(evaluation)
        }).toThrow('Invalid state transition from anonymized to evaluated')
      })
    })

    describe('accept', () => {
      it('should transition from EVALUATED to ACCEPTED', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)

        const ideaId = Identity.Generate()
        concept.accept(ideaId)

        expect(concept.isEvaluated()).toBeFalse()
        expect(concept.isAccepted()).toBeTrue()
        expect(concept.isArchived()).toBeFalse()
        expect(concept.isAnonymized()).toBeFalse()
        expect(concept.getIdeaId()).toBe(ideaId)
        expect(concept.wasEvaluated()).toBeTrue()
        expect(concept.wasAccepted()).toBeTrue()
        expect(concept.wasArchived()).toBeFalse()
        expect(concept.wasAnonymized()).toBeFalse()
      })

      it('should throw error when accepting from DRAFT state', () => {
        const ideaId = Identity.Generate()

        expect(() => {
          concept.accept(ideaId)
        }).toThrow('Invalid state transition from draft to accepted')
      })

      it('should throw error when accepting from ARCHIVED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.accept(Identity.Generate())
        concept.archive()

        expect(() => {
          concept.accept(Identity.Generate())
        }).toThrow('Invalid state transition from archived to accepted')
      })

      it('should throw error when accepting from ANONYMIZED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.anonymize()

        expect(() => {
          concept.accept(Identity.Generate())
        }).toThrow('Invalid state transition from anonymized to accepted')
      })
    })

    describe('archive', () => {
      it('should transition from ACCEPTED to ARCHIVED', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.accept(Identity.Generate())
        concept.archive()

        expect(concept.isEvaluated()).toBeFalse()
        expect(concept.isAccepted()).toBeFalse()
        expect(concept.isArchived()).toBeTrue()
        expect(concept.isAnonymized()).toBeFalse()
        expect(concept.wasEvaluated()).toBeTrue()
        expect(concept.wasAccepted()).toBeTrue()
        expect(concept.wasArchived()).toBeTrue()
        expect(concept.wasAnonymized()).toBeFalse()
      })

      it('should throw error when archiving from DRAFT state', () => {
        expect(() => {
          concept.archive()
        }).toThrow('Invalid state transition from draft to archived')
      })

      it('should throw error when archiving from EVALUATED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)

        expect(() => {
          concept.archive()
        }).toThrow('Invalid state transition from evaluated to archived')
      })

      it('should throw error when archiving from ANONYMIZED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.anonymize()

        expect(() => {
          concept.archive()
        }).toThrow('Invalid state transition from anonymized to archived')
      })
    })

    describe('anonymize', () => {
      it('should allow transition from DRAFT to ANONYMIZED', () => {
        concept.anonymize()

        expect(concept.isAnonymized()).toBeTrue()
      })

      it('should allow transition from EVALUATED to ANONYMIZED', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.anonymize()

        expect(concept.isAnonymized()).toBeTrue()
      })

      it('should allow transition from ACCEPTED to ANONYMIZED', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.accept(Identity.Generate())
        concept.anonymize()

        expect(concept.isAnonymized()).toBeTrue()
      })

      it('should allow transition from ARCHIVED to ANONYMIZED', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.accept(Identity.Generate())
        concept.archive()
        concept.anonymize()

        expect(concept.isAnonymized()).toBeTrue()
      })

      it('should throw error when anonymizing from ANONYMIZED state', () => {
        const evaluation = WellDefinedEvaluationFactory.New()
        concept.evaluate(evaluation)
        concept.accept(Identity.Generate())
        concept.archive()
        concept.anonymize()

        expect(() => {
          concept.anonymize()
        }).toThrow('Invalid state transition from anonymized to anonymized')
      })
    })
  })

  describe('Getter Methods', () => {
    it('should throw error when accessing evaluation before it exists', () => {
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider
      )

      expect(() => {
        concept.getEvaluation()
      }).toThrow('Concept has not been evaluated yet')
    })

    it('should throw error when accessing ideaId before it exists', () => {
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider
      )

      expect(() => {
        concept.getIdeaId()
      }).toThrow('Concept has not been accepted yet')
    })
  })

  describe('Time Provider', () => {
    it('should handle timezone differences when calculating age', () => {
      const utcDate = new Date('2024-01-01T00:00:00Z')
      const concept = Concept.New(
        validId,
        validProblem,
        validPersona,
        validRegion,
        validProductType,
        validStage,
        validExpiryPeriodInDays,
        timeProvider,
        utcDate
      )

      timeProvider.now.mockReturnValue(new Date('2024-01-01T23:59:59Z'))
      expect(concept.isAvailable()).toBeTrue()
    })
  })
})
