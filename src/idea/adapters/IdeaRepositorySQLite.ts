import { Idea } from '@/idea/domain/Aggregate'
import { Competitor } from '@/idea/domain/Competitor'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { ContentIdea } from '@/idea/domain/ContentIdea'
import { ContentIdeasForMarketing } from '@/idea/domain/ContentIdeasForMarketing'
import { ElevatorPitch } from '@/idea/domain/ElevatorPitch'
import { GoogleTrendsKeyword } from '@/idea/domain/GoogleTrendsKeyword'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { ProductName } from '@/idea/domain/ProductName'
import { Repository } from '@/idea/domain/Repository'
import { SWOTAnalysis } from '@/idea/domain/SWOTAnalysis'
import { SocialMediaCampaigns } from '@/idea/domain/SocialMediaCampaigns'
import { Strategy } from '@/idea/domain/Strategy'
import { TargetAudience } from '@/idea/domain/TargetAudience'
import { ValueProposition } from '@/idea/domain/ValueProposition'
import { prisma } from '@/lib/prisma'
import type { PrismaClient } from '@prisma/client/extension'

type UpdateFn = (idea: Idea) => Idea

export class IdeaRepositorySQLite implements Repository {
  async addIdea(idea: Idea): Promise<void> {
    if (idea.getTargetAudiences().length === 0) {
      throw new Error('Idea does not have target audiences')
    }

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
          ...(updatedIdea.isArchived() && { archivedAt: new Date() }),
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

      const googleTrendsKeywords = updatedIdea.getGoogleTrendsKeywords()
      if (googleTrendsKeywords) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'google_trends_keywords',
            },
          },
          create: {
            ideaId: id,
            key: 'google_trends_keywords',
            value: JSON.stringify(googleTrendsKeywords),
          },
          update: {
            value: JSON.stringify(googleTrendsKeywords),
            updatedAt: new Date(),
          },
        })
      }

      const contentIdeas = updatedIdea.getContentIdeasForMarketing()
      if (contentIdeas) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'content_ideas_for_marketing',
            },
          },
          create: {
            ideaId: id,
            key: 'content_ideas_for_marketing',
            value: JSON.stringify(contentIdeas),
          },
          update: {
            value: JSON.stringify(contentIdeas),
            updatedAt: new Date(),
          },
        })
      }

      const socialMediaCampaigns = updatedIdea.getSocialMediaCampaigns()
      if (socialMediaCampaigns) {
        await prisma.ideaContent.upsert({
          where: {
            ideaId_key: {
              ideaId: id,
              key: 'social_media_campaigns',
            },
          },
          create: {
            ideaId: id,
            key: 'social_media_campaigns',
            value: JSON.stringify(socialMediaCampaigns),
          },
          update: {
            value: JSON.stringify(socialMediaCampaigns),
            updatedAt: new Date(),
          },
        })
      }
    })
  }

  async getById(id: string): Promise<Idea | null> {
    const ideaModel = await prisma.idea.findUnique({
      where: { id },
      include: {
        targetAudiences: true,
        contents: true,
      },
    })

    if (!ideaModel) {
      return null
    }

    if (ideaModel.archivedAt) {
      return null
    }

    const targetAudiences = ideaModel.targetAudiences.map((audience) => {
      const targetAudience = TargetAudience.New(
        audience.id,
        ideaModel.id,
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

    const idea = Idea.New(
      ideaModel.id,
      ideaModel.conceptId,
      ideaModel.problem,
      ideaModel.marketExistence,
      targetAudiences
    )

    // Value proposition
    const valuePropositionModel = ideaModel.contents.find(
      (content) => content.key === 'value_proposition'
    )

    if (valuePropositionModel) {
      interface valueProposition {
        mainBenefit: string
        problemSolving: string
        differentiation: string
      }

      const data = JSON.parse(valuePropositionModel.value) as valueProposition

      idea.setValueProposition(
        ValueProposition.New(
          data.mainBenefit,
          data.problemSolving,
          data.differentiation
        )
      )
    }

    // Market analysis
    const marketAnalysisModel = ideaModel.contents.find(
      (content) => content.key === 'market_analysis'
    )

    if (marketAnalysisModel) {
      interface marketAnalysis {
        trends: string
        userBehaviors: string
        marketGaps: string
        innovationOpportunities: string
        strategicDirection: string
      }

      const data = JSON.parse(marketAnalysisModel.value) as marketAnalysis

      idea.setMarketAnalysis(
        MarketAnalysis.New(
          data.trends,
          data.userBehaviors,
          data.marketGaps,
          data.innovationOpportunities,
          data.strategicDirection
        )
      )
    }

    // Competitor analysis
    const competitorAnalysisModel = ideaModel.contents.find(
      (content) => content.key === 'competitor_analysis'
    )

    if (competitorAnalysisModel) {
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

      const data = JSON.parse(
        competitorAnalysisModel.value
      ) as competitorAnalysis

      const competitors = data.competitors.map((c) =>
        Competitor.New(
          c.name,
          c.productName,
          c.url,
          c.coreFeatures,
          c.valueProposition,
          c.userAcquisition,
          c.strengths,
          c.weaknesses,
          c.differentiationOpportunity
        )
      )

      idea.setCompetitorAnalysis(
        CompetitorAnalysis.New(
          competitors,
          data.comparison,
          data.differentiationSuggestions
        )
      )
    }

    // Product names
    const productNamesModel = ideaModel.contents.find(
      (content) => content.key === 'product_names'
    )

    if (productNamesModel) {
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

      data.forEach((product) => {
        idea.addProductName(
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
      })
    }

    // SWOT analysis
    const swotAnalysisModel = ideaModel.contents.find(
      (content) => content.key === 'swot_analysis'
    )

    if (swotAnalysisModel) {
      interface swotAnalysis {
        strengths: string[]
        weaknesses: string[]
        opportunities: string[]
        threats: string[]
      }

      const data = JSON.parse(swotAnalysisModel.value) as swotAnalysis

      idea.setSWOTAnalysis(
        SWOTAnalysis.New(
          data.strengths,
          data.weaknesses,
          data.opportunities,
          data.threats
        )
      )
    }

    // Elevator pitches
    const elevatorPitchesModel = ideaModel.contents.find(
      (content) => content.key === 'elevator_pitches'
    )

    if (elevatorPitchesModel) {
      interface elevatorPitch {
        hook: string
        problem: string
        solution: string
        valueProposition: string
        cta: string
      }

      type elevatorPitches = elevatorPitch[]

      const data = JSON.parse(elevatorPitchesModel.value) as elevatorPitches

      data.forEach((pitch) => {
        idea.addElevatorPitch(
          ElevatorPitch.New(
            pitch.hook,
            pitch.problem,
            pitch.solution,
            pitch.valueProposition,
            pitch.cta
          )
        )
      })
    }

    // Google Trends keywords
    const googleTrendsKeywordsModel = ideaModel.contents.find(
      (content) => content.key === 'google_trends_keywords'
    )

    if (googleTrendsKeywordsModel) {
      type keyword = {
        keyword: string
      }

      type keywords = keyword[]

      const data = JSON.parse(googleTrendsKeywordsModel.value) as keywords

      data.forEach((value) => {
        idea.addGoogleTrendsKeyword(GoogleTrendsKeyword.New(value.keyword))
      })
    }

    // Content ideas for marketing
    const contentIdeasModel = ideaModel.contents.find(
      (content) => content.key === 'content_ideas_for_marketing'
    )

    if (contentIdeasModel) {
      interface contentIdea {
        strategy: {
          name: string
        }
        platforms: string[]
        ideas: string[]
        benefits: string[]
      }

      interface contentIdeas {
        contentIdeas: contentIdea[]
      }

      const data = JSON.parse(contentIdeasModel.value) as contentIdeas

      const contentIdeasForMarketing = ContentIdeasForMarketing.New()

      data.contentIdeas.forEach((strategy) => {
        contentIdeasForMarketing.addContentIdea(
          ContentIdea.New(
            Strategy.New(strategy.strategy.name),
            strategy.platforms,
            strategy.ideas,
            strategy.benefits
          )
        )
      })

      idea.setContentIdeasForMarketing(contentIdeasForMarketing)
    }

    // Social media campaigns
    const socialMediaCampaignsModel = ideaModel.contents.find(
      (content) => content.key === 'social_media_campaigns'
    )

    if (socialMediaCampaignsModel) {
      interface campaigns {
        shortFormContents: Array<{
          header: string
          platform: string
          content: string
          tips: string[]
          imagePrompt: string
        }>
        longFormContents: Array<{
          header: string
          platform: string
          title: string
          content: string
          tips: string[]
          imagePrompt: string
        }>
        videoContents: Array<{
          header: string
          platform: string
          title: string
          script: string[]
          tips: string[]
          imagePrompt: string
        }>
      }

      const data = JSON.parse(socialMediaCampaignsModel.value) as campaigns

      const socialMediaCampaigns = SocialMediaCampaigns.New()

      data.shortFormContents.forEach((content) => {
        socialMediaCampaigns.addShortFormContent(content)
      })

      data.longFormContents.forEach((content) => {
        socialMediaCampaigns.addLongFormContent(content)
      })

      data.videoContents.forEach((content) => {
        socialMediaCampaigns.addVideoContent(content)
      })

      idea.setSocialMediaCampaigns(socialMediaCampaigns)
    }

    return idea
  }
}
