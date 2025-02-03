import { z } from 'zod'
import { Identity } from '@/common/domain/Identity'
import { TimeProvider } from '@/common/domain/TimeProvider'
import { Concept } from '@/concept/domain/Aggregate'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation, Status } from '@/concept/domain/Evaluation'
import { Repository } from '@/concept/domain/Repository'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'
import { prisma } from '@/lib/prisma'
import type { PrismaClient } from '@prisma/client/extension'

type UpdateFn = (concept: Concept) => Concept

const ValidationMetricsSchema = z.object({
  marketSize: z.string(),
  accessibility: z.number().min(0).max(10),
  painPointIntensity: z.number().min(0).max(10),
  willingnessToPay: z.number().min(0).max(10),
})

const TargetAudienceSchema = z.object({
  segment: z.string(),
  description: z.string(),
  challenges: z.array(z.string()),
  validationMetrics: ValidationMetricsSchema,
})

const ClarityScoreSchema = z.object({
  overallScore: z.number().min(0).max(10),
  metrics: z.object({
    problemClarity: z.number().min(0).max(10),
    targetAudienceClarity: z.number().min(0).max(10),
    scopeDefinition: z.number().min(0).max(10),
    valuePropositionClarity: z.number().min(0).max(10),
  }),
})

const LanguageAnalysisSchema = z.object({
  vagueTerms: z.array(z.string()),
  missingContext: z.array(z.string()),
  ambiguousStatements: z.array(z.string()),
})

const EvaluationSchema = z.object({
  status: z.string(),
  suggestions: z.array(z.string()),
  recommendations: z.array(z.string()),
  painPoints: z.array(z.string()),
  marketExistence: z.string(),
  targetAudience: z.array(TargetAudienceSchema),
  clarityScore: ClarityScoreSchema,
  languageAnalysis: LanguageAnalysisSchema,
})

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
      const evaluation = EvaluationSchema.parse(
        JSON.parse(conceptModel.evaluation)
      )

      concept.evaluate(
        Evaluation.New(
          evaluation.status as Status,
          evaluation.suggestions,
          evaluation.recommendations,
          evaluation.painPoints,
          evaluation.marketExistence,
          evaluation.targetAudience.map((audience) =>
            TargetAudience.New(
              audience.segment,
              audience.description,
              audience.challenges,
              ValidationMetrics.New(
                audience.validationMetrics.marketSize,
                audience.validationMetrics.accessibility,
                audience.validationMetrics.painPointIntensity,
                audience.validationMetrics.willingnessToPay
              )
            )
          ),
          ClarityScore.New(
            evaluation.clarityScore.overallScore,
            evaluation.clarityScore.metrics
          ),
          evaluation.languageAnalysis
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
