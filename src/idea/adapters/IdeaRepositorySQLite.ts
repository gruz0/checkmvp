import { Idea } from '@/idea/domain/Aggregate'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { ProductName } from '@/idea/domain/ProductName'
import { Repository } from '@/idea/domain/Repository'
import { SWOTAnalysis } from '@/idea/domain/SWOTAnalysis'
import { TargetAudience } from '@/idea/domain/TargetAudience'
import { ValueProposition } from '@/idea/domain/ValueProposition'
import { prisma } from '@/lib/prisma'
import { ElevatorPitch } from '../domain/ElevatorPitch'
import type { PrismaClient } from '@prisma/client/extension'

type UpdateFn = (idea: Idea) => Idea

export class IdeaRepositorySQLite implements Repository {
  async addIdea(idea: Idea): Promise<void> {
    await prisma.idea.create({
      data: {
        id: idea.getId().getValue(),
        conceptId: idea.getConceptId().getValue(),
        problem: idea.getProblem().getValue(),
        marketExistence: idea.getMarketExistence(),
        targetAudiences: {
          create: idea.getTargetAudiences().map((audience) => ({
            segment: audience.getSegment(),
            description: audience.getDescription(),
            challenges: JSON.stringify(audience.getChallenges()),
          })),
        },
      },
    })
  }

  async updateIdea(id: string, updateFn: UpdateFn): Promise<void> {
    await prisma.$transaction(async (prisma: PrismaClient) => {
      const idea = await this.getById(id)

      if (!idea) {
        throw new Error(`Unable to get idea by ID ${id}`)
      }

      const updatedIdea = updateFn(idea)

      await prisma.idea.update({
        where: {
          id: id,
        },
        data: {
          ...(updatedIdea.isMigrated() && { migratedAt: new Date() }),
          targetAudiences: {
            update: idea.getTargetAudiences().map((audience) => ({
              where: { id: audience.getId().getValue() },
              data: {
                why: audience.getWhy(),
                painPoints: JSON.stringify(audience.getPainPoints()),
                targetingStrategy: audience.getTargetingStrategy(),
                updatedAt: new Date(),
              },
            })),
          },
          updatedAt: new Date(),
        },
      })

      const valueProposition = updatedIdea.getValueProposition()
      if (valueProposition) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'value_proposition',
            },
          },
          create: {
            ideaId: id,
            key: 'value_proposition',
            value: JSON.stringify(valueProposition),
          },
          update: {
            value: JSON.stringify(valueProposition),
            updatedAt: new Date(),
          },
        })
      }

      const marketAnalysis = updatedIdea.getMarketAnalysis()
      if (marketAnalysis) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'market_analysis',
            },
          },
          create: {
            ideaId: id,
            key: 'market_analysis',
            value: JSON.stringify(marketAnalysis),
          },
          update: {
            value: JSON.stringify(marketAnalysis),
            updatedAt: new Date(),
          },
        })
      }

      const competitorAnalysis = updatedIdea.getCompetitorAnalysis()
      if (competitorAnalysis) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'competitor_analysis',
            },
          },
          create: {
            ideaId: id,
            key: 'competitor_analysis',
            value: JSON.stringify(competitorAnalysis),
          },
          update: {
            value: JSON.stringify(competitorAnalysis),
            updatedAt: new Date(),
          },
        })
      }

      const productNames = updatedIdea.getProductNames()
      if (productNames) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'product_names',
            },
          },
          create: {
            ideaId: id,
            key: 'product_names',
            value: JSON.stringify(productNames),
          },
          update: {
            value: JSON.stringify(productNames),
            updatedAt: new Date(),
          },
        })
      }

      const swotAnalysis = updatedIdea.getSWOTAnalysis()
      if (swotAnalysis) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'swot_analysis',
            },
          },
          create: {
            ideaId: id,
            key: 'swot_analysis',
            value: JSON.stringify(swotAnalysis),
          },
          update: {
            value: JSON.stringify(swotAnalysis),
            updatedAt: new Date(),
          },
        })
      }

      const elevatorPitches = updatedIdea.getElevatorPitches()
      if (elevatorPitches) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'elevator_pitches',
            },
          },
          create: {
            ideaId: id,
            key: 'elevator_pitches',
            value: JSON.stringify(elevatorPitches),
          },
          update: {
            value: JSON.stringify(elevatorPitches),
            updatedAt: new Date(),
          },
        })
      }
    })
  }

  async getById(id: string): Promise<Idea | null> {
    const ideaModel = await prisma.idea.findUnique({
      where: { id },
    })

    if (!ideaModel) {
      return null
    }

    const idea = Idea.New(
      ideaModel.id,
      ideaModel.conceptId,
      ideaModel.problem,
      ideaModel.marketExistence
    )

    return idea
  }

  async getTargetAudiencesByIdeaId(ideaId: string): Promise<TargetAudience[]> {
    const targetAudienceModels = await prisma.targetAudience.findMany({
      where: { ideaId },
    })

    return targetAudienceModels.map((audience) => {
      const targetAudience = TargetAudience.New(
        audience.id,
        ideaId,
        audience.segment,
        audience.description,
        JSON.parse(audience.challenges)
      )

      if (audience.why) {
        targetAudience.setWhy(audience.why)
      }

      if (audience.painPoints) {
        targetAudience.setPainPoints(JSON.parse(audience.painPoints))
      }

      if (audience.targetingStrategy) {
        targetAudience.setTargetingStrategy(audience.targetingStrategy)
      }

      return targetAudience
    })
  }

  async getValuePropositionByIdeaId(
    ideaId: string
  ): Promise<ValueProposition | null> {
    const valuePropositionModel = await prisma.ideaContent.findUnique({
      where: {
        ideaId_key: {
          ideaId: ideaId,
          key: 'value_proposition',
        },
      },
    })

    if (!valuePropositionModel) {
      return null
    }

    interface valueProposition {
      mainBenefit: string
      problemSolving: string
      differentiation: string
    }

    const data = JSON.parse(valuePropositionModel.value) as valueProposition

    return ValueProposition.New(
      data.mainBenefit,
      data.problemSolving,
      data.differentiation
    )
  }

  async getMarketAnalysisByIdeaId(
    ideaId: string
  ): Promise<MarketAnalysis | null> {
    const marketAnalysisModel = await prisma.ideaContent.findUnique({
      where: {
        ideaId_key: {
          ideaId: ideaId,
          key: 'market_analysis',
        },
      },
    })

    if (!marketAnalysisModel) {
      return null
    }

    interface marketAnalysis {
      trends: string
      userBehaviors: string
      marketGaps: string
      innovationOpportunities: string
      strategicDirection: string
    }

    const data = JSON.parse(marketAnalysisModel.value) as marketAnalysis

    return MarketAnalysis.New(
      data.trends,
      data.userBehaviors,
      data.marketGaps,
      data.innovationOpportunities,
      data.strategicDirection
    )
  }

  async getCompetitorAnalysisByIdeaId(
    ideaId: string
  ): Promise<CompetitorAnalysis | null> {
    const competitorAnalysisModel = await prisma.ideaContent.findUnique({
      where: {
        ideaId_key: {
          ideaId: ideaId,
          key: 'competitor_analysis',
        },
      },
    })

    if (!competitorAnalysisModel) {
      return null
    }

    interface competitor {
      name: string
      productName: string
      url: string
      coreFeatures: string[]
      valueProposition: string
      userAcquisition: string
      strengths: string[]
      weaknesses: string[]
      differentiationOpportunity: string
    }

    interface comparison {
      strengths: string[]
      weaknesses: string[]
    }

    interface competitorAnalysis {
      competitors: competitor[]
      comparison: comparison
      differentiationSuggestions: string[]
    }

    const data = JSON.parse(competitorAnalysisModel.value) as competitorAnalysis

    return CompetitorAnalysis.New(
      data.competitors,
      data.comparison,
      data.differentiationSuggestions
    )
  }

  async getProductNamesByIdeaId(ideaId: string): Promise<ProductName[] | null> {
    const productNamesModel = await prisma.ideaContent.findUnique({
      where: {
        ideaId_key: {
          ideaId: ideaId,
          key: 'product_names',
        },
      },
    })

    if (!productNamesModel) {
      return null
    }

    interface productName {
      productName: string
      domains: string[]
      why: string
      tagline: string
      targetAudienceInsight: string
      similarNames: string[]
      brandingPotential: string
    }

    type productNames = productName[]

    const data = JSON.parse(productNamesModel.value) as productNames

    return data.map((product) =>
      ProductName.New(
        product.productName,
        product.domains,
        product.why,
        product.tagline,
        product.targetAudienceInsight,
        product.similarNames,
        product.brandingPotential
      )
    )
  }

  async getSWOTAnalysisByIdeaId(ideaId: string): Promise<SWOTAnalysis | null> {
    const swotAnalysisModel = await prisma.ideaContent.findUnique({
      where: {
        ideaId_key: {
          ideaId: ideaId,
          key: 'swot_analysis',
        },
      },
    })

    if (!swotAnalysisModel) {
      return null
    }

    interface swotAnalysis {
      strengths: string[]
      weaknesses: string[]
      opportunities: string[]
      threats: string[]
    }

    const data = JSON.parse(swotAnalysisModel.value) as swotAnalysis

    return SWOTAnalysis.New(
      data.strengths,
      data.weaknesses,
      data.opportunities,
      data.threats
    )
  }

  async getElevatorPitchesByIdeaId(
    ideaId: string
  ): Promise<ElevatorPitch[] | null> {
    const elevatorPitchesModel = await prisma.ideaContent.findUnique({
      where: {
        ideaId_key: {
          ideaId: ideaId,
          key: 'elevator_pitches',
        },
      },
    })

    if (!elevatorPitchesModel) {
      return null
    }

    interface elevatorPitch {
      hook: string
      problem: string
      solution: string
      valueProposition: string
      cta: string
    }

    type elevatorPitches = elevatorPitch[]

    const data = JSON.parse(elevatorPitchesModel.value) as elevatorPitches

    return data.map((pitch) =>
      ElevatorPitch.New(
        pitch.hook,
        pitch.problem,
        pitch.solution,
        pitch.valueProposition,
        pitch.cta
      )
    )
  }
}
