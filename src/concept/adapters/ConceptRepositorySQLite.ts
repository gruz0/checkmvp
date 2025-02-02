import { Identity } from '@/common/domain/Identity'
import { TimeProvider } from '@/common/domain/TimeProvider'
import { Concept } from '@/concept/domain/Aggregate'
import { Evaluation } from '@/concept/domain/Evaluation'
import { Repository } from '@/concept/domain/Repository'
import { prisma } from '@/lib/prisma'
import type { PrismaClient } from '@prisma/client/extension'

type UpdateFn = (concept: Concept) => Concept

export class ConceptRepositorySQLite implements Repository {
  constructor(
    private readonly timeProvider: TimeProvider,
    private readonly conceptExpirationDays: number
  ) {}

  async addConcept(concept: Concept): Promise<void> {
    await prisma.concept.create({
      data: {
        id: concept.getId().getValue(),
        problem: concept.getProblem().getValue(),
        region: concept.getRegion().getValue(),
        createdAt: concept.getCreatedAt(),
      },
    })
  }

  async updateConcept(id: string, updateFn: UpdateFn): Promise<void> {
    await prisma.$transaction(async (tx: PrismaClient) => {
      const concept = await this.getById(id)

      if (!concept) {
        throw new Error(`Unable to get concept by ID ${id}`)
      }

      const updatedConcept = updateFn(concept)

      // TODO: We should validate uniqueness of the ideaId before updating a record.

      await tx.concept.update({
        where: {
          id: id,
        },
        data: {
          problem: updatedConcept.getProblem().getValue(),
          region: updatedConcept.getRegion().getValue(),
          ...(updatedConcept.isEvaluated() && {
            evaluatedAt: new Date(),
            evaluation: this.evaluationToJSON(updatedConcept.getEvaluation()),
          }),
          ...(updatedConcept.isAccepted() && {
            acceptedAt: new Date(),
            ideaId: updatedConcept.getIdeaId().getValue(),
          }),
          ...(updatedConcept.isArchived() && { archivedAt: new Date() }),
          ...(updatedConcept.isAnonymized() && {
            anonymizedAt: new Date(),
            problem: updatedConcept.getProblem().getValue(),
            ...(updatedConcept.wasEvaluated() && {
              evaluation: this.evaluationToJSON(updatedConcept.getEvaluation()),
            }),
          }),
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
      // FIXME: This is a temporary fix to support the old data.
      conceptModel.region ?? 'worldwide',
      this.conceptExpirationDays,
      this.timeProvider,
      conceptModel.createdAt
    )

    if (conceptModel.evaluation) {
      // FIXME: Refactor using zod.
      const json = JSON.parse(conceptModel.evaluation)

      concept.evaluate(
        Evaluation.New(
          json.status,
          json.suggestions,
          json.recommendations,
          json.painPoints,
          json.marketExistence,
          json.targetAudience,
          json.clarityScore,
          json.languageAnalysis
        )
      )
    }

    if (conceptModel.acceptedAt) {
      // FIXME: I'm not sure this is the valid scenario.
      // If concept has been accepted, it should have idea ID.
      // It's better to re-test this scenario.
      if (!conceptModel.ideaId) {
        throw new Error('Concept has been accepted, but does not have idea ID')
      }

      concept.accept(Identity.New(conceptModel.ideaId))
    }

    if (conceptModel.archivedAt) {
      concept.archive()
    }

    if (conceptModel.anonymizedAt) {
      concept.anonymize()
    }

    return concept
  }

  async getTotal(): Promise<number> {
    return await prisma.concept.count()
  }
}
