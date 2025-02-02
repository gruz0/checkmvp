import { FixedTimeProvider, TimeProvider } from '@/common/domain/TimeProvider'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { Concept } from '@/concept/domain/Aggregate'
import { prisma } from '@/lib/prisma'
import { Identity } from '@/shared/Identity'
import { WellDefinedEvaluationFactory } from '../domain/WellDefinedEvaluationFactory'

describe('ConceptRepositorySQLite', () => {
  let repository: ConceptRepositorySQLite
  let timeProvider: TimeProvider
  const fixedTime = new Date('2024-03-20T12:00:00Z')

  beforeAll(() => {
    timeProvider = new FixedTimeProvider(fixedTime)
    repository = new ConceptRepositorySQLite(timeProvider, 7) // 7 days expiration
  })

  beforeEach(async () => {
    // Clean the database before each test
    await prisma.concept.deleteMany({})
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('addConcept', () => {
    it('should successfully add a new concept to the database', async () => {
      const id = Identity.Generate().getValue()
      const problem = 'Long problem statement with a lot of words'
      const region = 'worldwide'
      const createdAt = new Date(fixedTime.getTime() - 1000) // 1 second before fixed time

      const concept = Concept.New(
        id,
        problem,
        region,
        7,
        timeProvider,
        createdAt
      )

      await repository.addConcept(concept)

      const savedConcept = await prisma.concept.findUnique({
        where: { id },
      })

      expect(savedConcept).not.toBeNull()
      expect(savedConcept).toEqual({
        id,
        problem,
        region,
        createdAt,
        updatedAt: expect.any(Date),
        evaluation: null,
        evaluatedAt: null,
        acceptedAt: null,
        archivedAt: null,
        anonymizedAt: null,
        ideaId: null,
      })
    })

    it('should throw an error when trying to add a concept with duplicate ID', async () => {
      const id = Identity.Generate().getValue()
      const concept = Concept.New(
        id,
        'Long problem statement with a lot of words',
        'worldwide',
        7,
        timeProvider,
        new Date(fixedTime.getTime() - 1000)
      )

      await repository.addConcept(concept)
      await expect(repository.addConcept(concept)).rejects.toThrow(
        'Unique constraint failed on the fields: (`id`)'
      )
    })

    it('should successfully add a concept with different region', async () => {
      const concept = Concept.New(
        Identity.Generate().getValue(),
        'Long problem statement with a lot of words',
        'europe',
        7,
        timeProvider,
        new Date(fixedTime.getTime() - 1000)
      )

      await repository.addConcept(concept)

      const savedConcept = await prisma.concept.findUnique({
        where: { id: concept.getId().getValue() },
      })

      expect(savedConcept).not.toBeNull()
      expect(savedConcept?.region).toBe('europe')
    })

    it('should preserve the exact creation timestamp', async () => {
      const createdAt = new Date(fixedTime.getTime() - 1000) // 1 second before fixed time
      const concept = Concept.New(
        Identity.Generate().getValue(),
        'Long problem statement with a lot of words',
        'worldwide',
        7,
        timeProvider,
        createdAt
      )

      await repository.addConcept(concept)

      const savedConcept = await prisma.concept.findUnique({
        where: { id: concept.getId().getValue() },
      })

      expect(savedConcept).not.toBeNull()
      expect(savedConcept?.createdAt.getTime()).toBe(createdAt.getTime())
    })
  })

  describe('updateConcept', () => {
    const createBaseConcept = async () => {
      const id = Identity.Generate().getValue()
      const concept = Concept.New(
        id,
        'This is a test problem that needs to be at least 30 characters long',
        'worldwide',
        7,
        timeProvider,
        new Date(fixedTime.getTime() - 1000)
      )

      await repository.addConcept(concept)
      return id
    }

    it('should update basic concept properties', async () => {
      const id = await createBaseConcept()

      await repository.updateConcept(id, (concept) =>
        Concept.New(
          concept.getId().getValue(),
          'Updated problem that needs to be at least thirty characters long',
          'europe',
          7,
          timeProvider,
          concept.getCreatedAt()
        )
      )

      const updated = await repository.getById(id)
      expect(updated?.getProblem().getValue()).toBe(
        'Updated problem that needs to be at least thirty characters long'
      )
      expect(updated?.getRegion().getValue()).toBe('europe')
    })

    it('should evaluate a concept', async () => {
      const id = await createBaseConcept()

      await repository.updateConcept(id, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        return concept
      })

      const updated = await repository.getById(id)
      expect(updated?.isEvaluated()).toBeTrue()
      expect(updated?.getEvaluation().getStatus()).toBe('well-defined')
    })

    it('should accept an evaluated concept', async () => {
      const id = await createBaseConcept()
      const ideaId = Identity.Generate()

      await repository.updateConcept(id, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        return concept
      })

      await repository.updateConcept(id, (concept) => {
        concept.accept(ideaId)
        return concept
      })

      const updated = await repository.getById(id)
      expect(updated?.isAccepted()).toBeTrue()
      expect(updated?.getIdeaId().getValue()).toBe(ideaId.getValue())
    })

    it('should archive an accepted concept', async () => {
      const id = await createBaseConcept()
      const ideaId = Identity.Generate()

      await repository.updateConcept(id, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        return concept
      })

      await repository.updateConcept(id, (concept) => {
        concept.accept(ideaId)
        return concept
      })

      await repository.updateConcept(id, (concept) => {
        concept.archive()
        return concept
      })

      const updated = await repository.getById(id)
      expect(updated?.isArchived()).toBeTrue()
    })

    it('should anonymize a concept', async () => {
      const id = await createBaseConcept()
      const ideaId = Identity.Generate()

      await repository.updateConcept(id, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        return concept
      })

      await repository.updateConcept(id, (concept) => {
        concept.accept(ideaId)
        return concept
      })

      await repository.updateConcept(id, (concept) => {
        concept.archive()
        return concept
      })

      await repository.updateConcept(id, (concept) => {
        concept.anonymize()
        return concept
      })

      const updated = await repository.getById(id)
      expect(updated?.isAnonymized()).toBeTrue()
    })

    it('should throw error when concept not found', async () => {
      const nonExistentId = Identity.Generate().getValue()

      await expect(
        repository.updateConcept(nonExistentId, (concept) => concept)
      ).rejects.toThrow(`Unable to get concept by ID ${nonExistentId}`)
    })

    it('should maintain state history through multiple updates', async () => {
      const id = await createBaseConcept()
      const ideaId = Identity.Generate()

      // First update: evaluate
      await repository.updateConcept(id, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        return concept
      })

      // Second update: accept
      await repository.updateConcept(id, (concept) => {
        concept.accept(ideaId)
        return concept
      })

      // Third update: archive
      await repository.updateConcept(id, (concept) => {
        concept.archive()
        return concept
      })

      const updated = await repository.getById(id)
      expect(updated?.wasEvaluated()).toBeTrue()
      expect(updated?.wasAccepted()).toBeTrue()
      expect(updated?.wasArchived()).toBeTrue()
      expect(updated?.getIdeaId().getValue()).toBe(ideaId.getValue())
    })
  })
})
