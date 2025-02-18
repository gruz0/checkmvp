import { Identity } from '@/common/domain/Identity'
import { SystemTimeProvider, TimeProvider } from '@/common/domain/TimeProvider'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { EventBusInMemory } from '@/concept/adapters/EventBusInMemory'
import { AcceptConceptHandler } from '@/concept/app/commands/AcceptConcept'
import { Concept } from '@/concept/domain/Aggregate'
import { ConceptAccepted } from '@/concept/domain/events/ConceptAccepted'
import { prisma } from '@/lib/prisma'
import { WellDefinedEvaluationFactory } from '__tests__/concept/domain/WellDefinedEvaluationFactory'

describe('AcceptConceptHandler', () => {
  let handler: AcceptConceptHandler
  let repository: ConceptRepositorySQLite
  let eventBus: EventBusInMemory
  let timeProvider: TimeProvider
  let conceptExpirationDays: number
  let mockIdeaService: {
    reserve: jest.Mock
  }

  const validConcept = {
    id: Identity.Generate().getValue(),
    problem:
      'This is a valid problem statement that meets the minimum length requirement and provides meaningful context for testing purposes.',
    persona:
      'Software developers with extensive experience in building scalable applications and understanding of distributed systems architecture.',
    region: 'worldwide',
    productType: 'b2c',
    stage: 'idea',
  }

  const validCommand = {
    id: validConcept.id,
    newIdeaId: Identity.Generate().getValue(),
    targetAudienceId: Identity.Generate().getValue(),
    statement: 'Valid statement for the idea',
    hypotheses: 'Valid hypotheses for testing',
  }

  beforeAll(() => {
    timeProvider = new SystemTimeProvider()
    conceptExpirationDays = 30
  })

  beforeEach(async () => {
    await prisma.concept.deleteMany({})

    mockIdeaService = {
      reserve: jest.fn().mockResolvedValue({ success: true, message: 'OK' }),
    }

    eventBus = new EventBusInMemory()
    repository = new ConceptRepositorySQLite(
      timeProvider,
      conceptExpirationDays
    )
    handler = new AcceptConceptHandler(repository, mockIdeaService, eventBus)

    const concept = Concept.New(
      validConcept.id,
      validConcept.problem,
      validConcept.persona,
      validConcept.region,
      validConcept.productType,
      validConcept.stage,
      conceptExpirationDays,
      timeProvider
    )
    await repository.addConcept(concept)
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('handle', () => {
    it('should throw error when concept has not been evaluated', async () => {
      await expect(handler.handle(validCommand)).rejects.toThrow(
        'Invalid state transition from draft to accepted'
      )
    })

    it('should accept concept and emit ConceptAccepted event when idea reservation succeeds', async () => {
      await repository.updateConcept(validCommand.id, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        return concept
      })

      const emitSpy = jest.spyOn(eventBus, 'emit')

      await handler.handle(validCommand)

      // Verify idea service was called correctly
      expect(mockIdeaService.reserve).toHaveBeenCalledWith(
        validCommand.newIdeaId,
        validCommand.id,
        validCommand.targetAudienceId,
        validCommand.statement,
        validCommand.hypotheses
      )

      // Verify concept was updated
      const concept = await repository.getById(validCommand.id)
      if (!concept) {
        throw new Error('Concept not found')
      }

      expect(concept.isAccepted()).toBeTrue()
      expect(concept.getIdeaId().getValue()).toBe(validCommand.newIdeaId)

      // Verify event was emitted
      expect(emitSpy).toHaveBeenCalledOnce()
      expect(emitSpy).toHaveBeenCalledWith(new ConceptAccepted(validCommand.id))
    })

    it('should throw error when concept does not exist', async () => {
      const invalidCommand = {
        ...validCommand,
        id: Identity.Generate().getValue(),
      }

      await expect(handler.handle(invalidCommand)).rejects.toThrow(
        `Concept with ID ${invalidCommand.id} does not exist`
      )
    })

    it('should throw error when idea reservation fails', async () => {
      mockIdeaService.reserve.mockResolvedValueOnce({
        success: false,
        message: 'Reservation failed',
      })

      await expect(handler.handle(validCommand)).rejects.toThrow(
        'Unable to reserve idea ID: Reservation failed'
      )

      const concept = await repository.getById(validCommand.id)
      expect(concept?.isAccepted()).toBeFalse()
    })

    it('should throw error when idea service throws an error', async () => {
      mockIdeaService.reserve.mockRejectedValueOnce(
        new Error('Service unavailable')
      )

      await expect(handler.handle(validCommand)).rejects.toThrow(
        'Service unavailable'
      )

      const concept = await repository.getById(validCommand.id)
      expect(concept?.isAccepted()).toBeFalse()
    })
  })
})
