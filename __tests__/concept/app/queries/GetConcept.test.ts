import { Identity } from '@/common/domain/Identity'
import { SystemTimeProvider, TimeProvider } from '@/common/domain/TimeProvider'
import { ApplicationError } from '@/common/errors/ApplicationError'
import { NotFoundError } from '@/common/errors/NotFoundError'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { GetConceptHandler } from '@/concept/app/queries/GetConcept'
import { Concept } from '@/concept/domain/Aggregate'
import { prisma } from '@/lib/prisma'

describe('GetConceptHandler', () => {
  let handler: GetConceptHandler
  let repository: ConceptRepositorySQLite
  let timeProvider: TimeProvider
  let conceptExpirationDays: number

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

    repository = new ConceptRepositorySQLite(
      timeProvider,
      conceptExpirationDays
    )
    handler = new GetConceptHandler(repository)
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('handle', () => {
    it('should retrieve an existing concept successfully', async () => {
      // Create a concept first
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

      // Retrieve the concept
      const result = await handler.handle({ id: validConcept.id })

      expect(result).toBeInstanceOf(Concept)
      expect(result.getId().getValue()).toBe(validConcept.id)
      expect(result.getProblem().getValue()).toBe(validConcept.problem)
      expect(result.getPersona().getValue()).toBe(validConcept.persona)
      expect(result.getRegion().getValue()).toBe(validConcept.region)
      expect(result.isAvailable()).toBeTrue()
    })

    it('should throw NotFoundError when concept does not exist', async () => {
      const nonExistentId = Identity.Generate().getValue()

      await expect(handler.handle({ id: nonExistentId })).rejects.toThrow(
        NotFoundError
      )
    })

    it('should throw ApplicationError when concept is not available', async () => {
      // Create a concept with expiration in the past
      const mockTimeProvider = {
        now: jest.fn().mockReturnValue(new Date('2024-01-01')),
      }

      const concept = Concept.New(
        validConcept.id,
        validConcept.problem,
        validConcept.persona,
        validConcept.region,
        validConcept.productType,
        validConcept.stage,
        conceptExpirationDays,
        mockTimeProvider,
        new Date('2024-01-01')
      )
      await repository.addConcept(concept)

      // Fast forward time to make the concept expired
      jest
        .spyOn(mockTimeProvider, 'now')
        .mockReturnValue(new Date('2024-01-04'))

      await expect(handler.handle({ id: validConcept.id })).rejects.toThrow(
        ApplicationError
      )
    })
  })
})
