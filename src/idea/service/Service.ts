import { Service as IdeaService } from '@/common/client/Concept/Service'
import { EventBusInMemory } from '@/idea/adapters/EventBusInMemory'
import { IdeaRepositorySQLite } from '@/idea/adapters/IdeaRepositorySQLite'
import { CompetitorAnalysisEvaluator } from '@/idea/adapters/OpenAIService/CompetitorAnalysisEvaluator'
import { ContentIdeasEvaluator } from '@/idea/adapters/OpenAIService/ContentIdeasEvaluator'
import { ElevatorPitchesEvaluator } from '@/idea/adapters/OpenAIService/ElevatorPitchesEvaluator'
import { GoogleTrendsKeywordsEvaluator } from '@/idea/adapters/OpenAIService/GoogleTrendsKeywordsEvaluator'
import { MarketAnalysisEvaluator } from '@/idea/adapters/OpenAIService/MarketAnalysisEvaluator'
import { PotentialNamesEvaluator } from '@/idea/adapters/OpenAIService/PotentialNamesEvaluator'
import { SWOTAnalysisEvaluator } from '@/idea/adapters/OpenAIService/SWOTAnalysisEvaluator'
import { SocialMediaCampaignsEvaluator } from '@/idea/adapters/OpenAIService/SocialMediaCampaignsEvaluator'
import { TargetAudienceEvaluator } from '@/idea/adapters/OpenAIService/TargetAudienceEvaluator'
import { ValuePropositionEvaluator } from '@/idea/adapters/OpenAIService/ValuePropositionEvaluator'
import { Application } from '@/idea/app/App'
import { ArchivationHandler } from '@/idea/app/commands/Archive'
import { MakeReservationHandler } from '@/idea/app/commands/MakeReservation'
import { RequestSocialMediaCampaignsHandler } from '@/idea/app/commands/RequestSocialMediaCampaigns'
import { GetIdeaHandler } from '@/idea/app/queries/GetIdea'
import { GetSocialMediaCampaignsHandler } from '@/idea/app/queries/GetSocialMediaCampaigns'
import { CompetitorAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/CompetitorAnalysisEvaluationSubscriber'
import { ContentIdeasEvaluationSubscriber } from '@/idea/events/subscribers/ContentIdeasEvaluationSubscriber'
import { ElevatorPitchesEvaluationSubscriber } from '@/idea/events/subscribers/ElevatorPitchesEvaluationSubscriber'
import { GoogleTrendsKeywordsEvaluationSubscriber } from '@/idea/events/subscribers/GoogleTrendsKeywordsEvaluationSubscriber'
import { MarketAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/MarketAnalysisEvaluationSubscriber'
import { PotentialNamesEvaluationSubscriber } from '@/idea/events/subscribers/PotentialNamesEvaluationSubscriber'
import { SWOTAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/SWOTAnalysisEvaluationSubscriber'
import { SocialMediaCampaignsSubscriber } from '@/idea/events/subscribers/SocialMediaCampaignsSubscriber'
import { TargetAudienceEvaluationSubscriber } from '@/idea/events/subscribers/TargetAudienceEvaluationSubscriber'
import { ValuePropositionEvaluationSubscriber } from '@/idea/events/subscribers/ValuePropositionEvaluationSubscriber'
import { env } from '@/lib/env'

const registerApp = (): Application => {
  const ideaRepository = new IdeaRepositorySQLite()
  const eventBus = new EventBusInMemory()
  const ideaService = new IdeaService(env.CONCEPT_SERVICE_API_BASE)

  const targetAudienceEvaluationSubscriber =
    new TargetAudienceEvaluationSubscriber(
      ideaRepository,
      new TargetAudienceEvaluator(env.OPENAI_API_KEY)
    )

  const valuePropositionEvaluationSubscriber =
    new ValuePropositionEvaluationSubscriber(
      ideaRepository,
      new ValuePropositionEvaluator(env.OPENAI_API_KEY),
      eventBus
    )

  const marketAnalysisEvaluationSubscriber =
    new MarketAnalysisEvaluationSubscriber(
      ideaRepository,
      new MarketAnalysisEvaluator(env.OPENAI_API_KEY)
    )

  const competitorAnalysisEvaluationSubscriber =
    new CompetitorAnalysisEvaluationSubscriber(
      ideaRepository,
      new CompetitorAnalysisEvaluator(env.OPENAI_API_KEY)
    )

  const potentialNamesEvaluationSubscriber =
    new PotentialNamesEvaluationSubscriber(
      ideaRepository,
      new PotentialNamesEvaluator(env.OPENAI_API_KEY)
    )

  const swotAnalysisEvaluationSubscriber = new SWOTAnalysisEvaluationSubscriber(
    ideaRepository,
    new SWOTAnalysisEvaluator(env.OPENAI_API_KEY)
  )

  const elevatorPitchesEvaluationSubscriber =
    new ElevatorPitchesEvaluationSubscriber(
      ideaRepository,
      new ElevatorPitchesEvaluator(env.OPENAI_API_KEY)
    )

  const googleTrendsKeywordsEvaluationSubscriber =
    new GoogleTrendsKeywordsEvaluationSubscriber(
      ideaRepository,
      new GoogleTrendsKeywordsEvaluator(env.OPENAI_API_KEY)
    )

  const contentIdeasEvaluationSubscriber = new ContentIdeasEvaluationSubscriber(
    ideaRepository,
    new ContentIdeasEvaluator(env.OPENAI_API_KEY)
  )

  const socialMediaCampaignsSubscriber = new SocialMediaCampaignsSubscriber(
    ideaRepository,
    new SocialMediaCampaignsEvaluator(env.OPENAI_API_KEY)
  )

  eventBus.subscribe('IdeaCreated', targetAudienceEvaluationSubscriber)
  eventBus.subscribe('IdeaCreated', valuePropositionEvaluationSubscriber)
  eventBus.subscribe('IdeaCreated', marketAnalysisEvaluationSubscriber)
  eventBus.subscribe('IdeaCreated', competitorAnalysisEvaluationSubscriber)
  eventBus.subscribe('IdeaCreated', potentialNamesEvaluationSubscriber)
  eventBus.subscribe(
    'ValuePropositionEvaluated',
    swotAnalysisEvaluationSubscriber
  )
  eventBus.subscribe(
    'ValuePropositionEvaluated',
    elevatorPitchesEvaluationSubscriber
  )
  eventBus.subscribe(
    'ValuePropositionEvaluated',
    googleTrendsKeywordsEvaluationSubscriber
  )
  eventBus.subscribe(
    'ValuePropositionEvaluated',
    contentIdeasEvaluationSubscriber
  )
  eventBus.subscribe(
    'SocialMediaCampaignsRequested',
    socialMediaCampaignsSubscriber
  )

  return {
    Commands: {
      MakeReservation: new MakeReservationHandler(
        ideaRepository,
        ideaService,
        eventBus
      ),
      Archive: new ArchivationHandler(ideaRepository, eventBus),
      RequestSocialMediaCampaigns: new RequestSocialMediaCampaignsHandler(
        ideaRepository,
        eventBus
      ),
    },
    Queries: {
      GetIdea: new GetIdeaHandler(ideaRepository),
      GetSocialMediaCampaigns: new GetSocialMediaCampaignsHandler(
        ideaRepository
      ),
    },
  }
}

const globalForApp = global as unknown as {
  ideaApp: Application | undefined
}

const ideaApp = globalForApp.ideaApp ?? registerApp()

if (process.env.NODE_ENV !== 'production') {
  globalForApp.ideaApp = ideaApp
}

export { ideaApp as App }
