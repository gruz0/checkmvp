import { Identity } from '@/common/domain/Identity'
import { FixedTimeProvider, TimeProvider } from '@/common/domain/TimeProvider'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { Concept } from '@/concept/domain/Aggregate'
import { prisma } from '@/lib/prisma'
import { WellDefinedEvaluationFactory } from '../domain/WellDefinedEvaluationFactory'

describe('ConceptRepositorySQLite', () => {
  let repository: ConceptRepositorySQLite
  let timeProvider: TimeProvider
  const fixedTime = new Date('2024-03-20T12:00:00Z')
  const problem =
    'Long problem statement with a lot of words that satisfies the criteria'
  const persona =
    'Persona that satisfies the criteria and is long enough to pass the validation'
  const region = 'worldwide'
  const productType = 'b2c'
  const stage = 'idea'

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
      const createdAt = new Date(fixedTime.getTime() - 1000) // 1 second before fixed time

      const concept = Concept.New(
        id,
        problem,
        persona,
        region,
        productType,
        stage,
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
        persona,
        region,
        productType,
        stage,
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
        problem,
        persona,
        region,
        productType,
        stage,
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
        problem,
        persona,
        'europe',
        productType,
        stage,
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
        problem,
        persona,
        region,
        productType,
        stage,
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
        problem,
        persona,
        region,
        productType,
        stage,
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
          'Updated problem that needs to be at least sixty-four characters long',
          'Persona that satisfies the criteria and long enough to pass the validation',
          'europe',
          productType,
          stage,
          7,
          timeProvider,
          concept.getCreatedAt()
        )
      )

      const updated = await repository.getById(id)
      if (!updated) {
        throw new Error('Concept not found')
      }

      expect(updated.getProblem().getValue()).toBe(
        'Updated problem that needs to be at least sixty-four characters long'
      )
      expect(updated.getPersona().getValue()).toBe(
        'Persona that satisfies the criteria and long enough to pass the validation'
      )
      expect(updated.getRegion().getValue()).toBe('europe')
    })

    it('should evaluate a concept', async () => {
      const id = await createBaseConcept()

      await repository.updateConcept(id, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        return concept
      })

      const updated = await repository.getById(id)
      if (!updated) {
        throw new Error('Concept not found')
      }

      expect(updated.isEvaluated()).toBeTrue()
      expect(updated.getEvaluation().getStatus()).toBe('well-defined')
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
      if (!updated) {
        throw new Error('Concept not found')
      }

      expect(updated.isAccepted()).toBeTrue()
      expect(updated.getIdeaId().getValue()).toBe(ideaId.getValue())
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
      if (!updated) {
        throw new Error('Concept not found')
      }

      expect(updated.isArchived()).toBeTrue()
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
      if (!updated) {
        throw new Error('Concept not found')
      }

      expect(updated.isAnonymized()).toBeTrue()
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
      if (!updated) {
        throw new Error('Concept not found')
      }

      expect(updated.wasEvaluated()).toBeTrue()
      expect(updated.wasAccepted()).toBeTrue()
      expect(updated.wasArchived()).toBeTrue()
      expect(updated.getIdeaId().getValue()).toBe(ideaId.getValue())
    })

    it('should throw error when trying to accept a concept with duplicate ideaId', async () => {
      // Create and save first concept
      const firstConceptId = await createBaseConcept()
      const sharedIdeaId = Identity.Generate()

      // Accept first concept
      await repository.updateConcept(firstConceptId, (concept) => {
        concept.evaluate(WellDefinedEvaluationFactory.New())
        concept.accept(sharedIdeaId)
        return concept
      })

      // Create and save second concept
      const secondConceptId = await createBaseConcept()

      // Try to accept second concept with same ideaId
      await expect(
        repository.updateConcept(secondConceptId, (concept) => {
          concept.evaluate(WellDefinedEvaluationFactory.New())
          concept.accept(sharedIdeaId)
          return concept
        })
      ).rejects.toThrow(
        `Concept with ideaId ${sharedIdeaId.getValue()} already exists`
      )

      // Verify second concept was not accepted
      const secondConcept = await repository.getById(secondConceptId)
      if (!secondConcept) {
        throw new Error(`Concept with ID ${secondConceptId} not found`)
      }

      expect(secondConcept.isAccepted()).toBeFalse()
    })
  })
})
