import { Concept } from '@/concept/domain/Aggregate'
import { Evaluation } from '@/concept/domain/Evaluation'
import { Repository } from '@/concept/domain/Repository'
import { prisma } from '@/lib/prisma'
import type { PrismaClient } from '@prisma/client/extension'

type UpdateFn = (concept: Concept) => Concept

export class ConceptRepositorySQLite implements Repository {
  async addConcept(concept: Concept): Promise<void> {
    await prisma.concept.create({
      data: {
        id: concept.getId().getValue(),
        problem: concept.getProblem().getValue(),
        createdAt: concept.getCreatedAt(),
      },
    })
  }

  async updateConcept(id: string, updateFn: UpdateFn): Promise<void> {
    await prisma.$transaction(async (prisma: PrismaClient) => {
      const concept = await this.getById(id)

      if (!concept) {
        throw new Error(`Unable to get concept by ID ${id}`)
      }

      const updatedConcept = updateFn(concept)

      const evaluation = updatedConcept.getEvaluation()

      // TODO: We should validate uniqueness of the ideaId before updating a record.
      const ideaId = updatedConcept.getIdeaId()

      await prisma.concept.update({
        where: {
          id: id,
        },
        data: {
          problem: updatedConcept.getProblem().getValue(),
          ...(evaluation && { evaluation: this.evaluationToJSON(evaluation) }),
          ...(updatedConcept.isEvaluated() && { evaluatedAt: new Date() }),
          ...(updatedConcept.isAccepted() && { acceptedAt: new Date() }),
          ...(ideaId && { ideaId: ideaId.getValue() }),
          ...(updatedConcept.isArchived() && { archivedAt: new Date() }),
          updatedAt: new Date(),
        },
      })
    })
  }

  evaluationToJSON(evaluation: Evaluation): string {
    return JSON.stringify({
      status: evaluation.getStatus(),
      suggestions: evaluation.getSuggestions(),
      recommendations: evaluation.getRecommendations(),
      painPoints: evaluation.getPainPoints(),
      marketExistence: evaluation.getMarketExistence(),
      targetAudience: evaluation.getTargetAudience(),
      clarityScore: evaluation.getClarityScore(),
      languageAnalysis: evaluation.getLanguageAnalysis(),
    })
  }

  async getById(id: string): Promise<Concept | null> {
    const conceptModel = await prisma.concept.findUnique({
      where: { id },
    })

    if (!conceptModel) {
      return null
    }

    const concept = Concept.New(
      conceptModel.id,
      conceptModel.problem,
      conceptModel.createdAt
    )

    if (conceptModel.evaluation) {
      const json = JSON.parse(conceptModel.evaluation)

      // FIXME: As many changes have applied since 17 Jan 2025, we don't want to support them
      // This condition can be removed once we go live on production.
      const createdAtDate = new Date(conceptModel.createdAt)
      const thresholdDate = new Date('2025-01-18T00:00:00Z')

      if (
        json.status === 'requires_changes' &&
        json.painPoints.length === 0 &&
        createdAtDate < thresholdDate
      ) {
        throw new Error(
          'The concept was created before January 18, 2025, and is no longer supported. Please create a new one.'
        )
      }

      const evaluation = new Evaluation(
        json.status,
        json.suggestions,
        json.recommendations,
        json.painPoints,
        json.marketExistence,
        json.targetAudience,
        json.clarityScore,
        json.languageAnalysis
      )

      concept.evaluate(evaluation)
    }

    if (conceptModel.acceptedAt) {
      if (!conceptModel.ideaId) {
        throw new Error('Concept has been accepted, but does not have idea ID')
      }

      concept.accept(conceptModel.ideaId)
    }

    if (conceptModel.archivedAt) {
      concept.archive()
    }

    return concept
  }

  async getTotal(): Promise<number> {
    return await prisma.concept.count()
  }
}
