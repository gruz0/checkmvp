import * as Sentry from '@sentry/nextjs'
import { Identity } from '@/common/domain/Identity'
import { SystemTimeProvider } from '@/common/domain/TimeProvider'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { Concept } from '@/concept/domain/Aggregate'
import { Service } from '@/concept/domain/anonymization/AnonymizationService'
import { ConceptTransitioned } from '@/concept/domain/events/ConceptTransitioned'
import { ConceptAnonymizationSubscriber } from '@/concept/events/subscribers/ConceptAnonymizationSubscriber'
import { prisma } from '@/lib/prisma'
import { WellDefinedEvaluationFactory } from '__tests__/concept/domain/WellDefinedEvaluationFactory'

// Mock Sentry
jest.mock('@sentry/nextjs', () => ({
  setTag: jest.fn(),
  addBreadcrumb: jest.fn(),
  captureException: jest.fn(),
}))

describe('ConceptAnonymizationSubscriber', () => {
  let subscriber: ConceptAnonymizationSubscriber
  let repository: ConceptRepositorySQLite
  let conceptId: string
  const CONCEPT_EXPIRATION_DAYS = 3

  beforeEach(async () => {
    // Reset all mocks and database
    jest.clearAllMocks()
    await prisma.concept.deleteMany()

    repository = new ConceptRepositorySQLite(
      new SystemTimeProvider(),
      CONCEPT_EXPIRATION_DAYS
    )
    subscriber = new ConceptAnonymizationSubscriber(repository, new Service())

    conceptId = Identity.Generate().getValue()
    const concept = Concept.New(
      conceptId,
      'Long problem that satisfies the criteria and is long enough to pass the validation',
      'Persona that satisfies the criteria and is long enough to pass the validation',
      'worldwide',
      'b2c',
      'idea',
      30,
      new SystemTimeProvider()
    )

    await repository.addConcept(concept)

    await repository.updateConcept(conceptId, (c) => {
      c.evaluate(WellDefinedEvaluationFactory.New())
      return c
    })

    await repository.updateConcept(conceptId, (c) => {
      c.accept(Identity.Generate())
      return c
    })

    await repository.updateConcept(conceptId, (c) => {
      c.archive()
      return c
    })
  })

  afterAll(async () => {
    await prisma.concept.deleteMany()
    await prisma.$disconnect()
  })

  const createEvent = (id: string): ConceptTransitioned => ({
    type: 'ConceptTransitioned',
    payload: {
      id,
      ideaId: Identity.Generate().getValue(),
    },
  })

  describe('getName', () => {
    it('should return the correct class name', () => {
      expect(subscriber.getName()).toBe('ConceptAnonymizationSubscriber')
    })
  })

  describe('handle', () => {
    it('should set the correct Sentry tags', async () => {
      const event = createEvent(conceptId)
      await subscriber.handle(event)

      expect(Sentry.setTag).toHaveBeenCalledWith('component', 'BackgroundJob')
      expect(Sentry.setTag).toHaveBeenCalledWith(
        'job_type',
        'ConceptAnonymizationSubscriber'
      )
      expect(Sentry.setTag).toHaveBeenCalledWith('event_type', event.type)
      expect(Sentry.setTag).toHaveBeenCalledWith('concept_id', event.payload.id)
    })

    it('should add a breadcrumb when starting', async () => {
      const event = createEvent(conceptId)
      await subscriber.handle(event)

      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
        message: 'ConceptAnonymizationSubscriber started',
      })
    })

    it('should successfully anonymize a concept', async () => {
      const event = createEvent(conceptId)
      await subscriber.handle(event)

      const anonymizedConcept = await repository.getById(conceptId)
      if (!anonymizedConcept) {
        throw new Error('Concept not found')
      }

      expect(anonymizedConcept.isAnonymized()).toBeTrue()
    })

    it('should throw an error if concept is not found', async () => {
      const event = createEvent('non-existent-id')

      await expect(subscriber.handle(event)).rejects.toThrow(
        'Unable to get concept by ID non-existent-id'
      )

      expect(Sentry.captureException).toHaveBeenCalled()
    })

    it('should verify concept data is properly anonymized', async () => {
      const event = createEvent(conceptId)
      await subscriber.handle(event)

      const anonymizedConcept = await repository.getById(conceptId)
      if (!anonymizedConcept) {
        throw new Error('Concept not found')
      }

      expect(anonymizedConcept.getProblem().getValue()).toBe(
        'This problem has been anonymized and is no longer available for public view.'
      )
      expect(anonymizedConcept.getPersona().getValue()).toBe(
        'This persona has been anonymized and is no longer available for public view.'
      )
      expect(anonymizedConcept.getProductType().getValue()).toBe('b2c')
      expect(anonymizedConcept.getStage().getValue()).toBe('idea')
      expect(anonymizedConcept.isAnonymized()).toBeTrue()
    })
  })
})
