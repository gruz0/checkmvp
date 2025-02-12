import { Identity } from '@/common/domain/Identity'
import { SystemTimeProvider, TimeProvider } from '@/common/domain/TimeProvider'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { EventBusInMemory } from '@/concept/adapters/EventBusInMemory'
import { EvaluateConceptHandler } from '@/concept/app/commands/EvaluateConcept'
import { Concept } from '@/concept/domain/Aggregate'
import { ConceptCreated } from '@/concept/domain/events/ConceptCreated'
import { prisma } from '@/lib/prisma'

describe('EvaluateConceptHandler', () => {
  let handler: EvaluateConceptHandler
  let repository: ConceptRepositorySQLite
  let eventBus: EventBusInMemory
  let timeProvider: TimeProvider
  let conceptExpirationDays: number

  const validCommand = {
    id: Identity.Generate().getValue(),
    problem:
      'This is a valid problem statement that meets the minimum length requirement and provides meaningful context for testing purposes.',
    persona:
      'Software developers with extensive experience in building scalable applications and understanding of distributed systems architecture.',
    region: 'worldwide',
    productType: 'b2c',
    stage: 'idea',
  }

  beforeAll(() => {
    timeProvider = new SystemTimeProvider()
    conceptExpirationDays = 30
    repository = new ConceptRepositorySQLite(
      timeProvider,
      conceptExpirationDays
    )
  })

  beforeEach(async () => {
    await prisma.concept.deleteMany({})

    eventBus = new EventBusInMemory()
    repository = new ConceptRepositorySQLite(
      timeProvider,
      conceptExpirationDays
    )
    handler = new EvaluateConceptHandler(
      repository,
      eventBus,
      timeProvider,
      conceptExpirationDays
    )
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('handle', () => {
    it('should create a new concept and emit ConceptCreated event', async () => {
      const emitSpy = jest.spyOn(eventBus, 'emit')

      await handler.handle(validCommand)

      const concept = await repository.getById(validCommand.id)
      if (!concept) {
        throw new Error('Concept not found')
      }

      expect(concept).toBeInstanceOf(Concept)
      expect(concept.getId().getValue()).toBe(validCommand.id)
      expect(concept.getProblem().getValue()).toBe(validCommand.problem)
      expect(concept.getPersona().getValue()).toBe(validCommand.persona)
      expect(concept.getRegion().getValue()).toBe(validCommand.region)
      expect(concept.isAvailable()).toBeTrue()

      expect(emitSpy).toHaveBeenCalledOnce()
      expect(emitSpy).toHaveBeenCalledWith(new ConceptCreated(validCommand.id))
    })
  })
})
