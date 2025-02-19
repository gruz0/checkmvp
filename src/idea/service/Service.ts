import { Service as IdeaService } from '@/common/client/Concept/Service'
import { EventBusInMemory } from '@/idea/adapters/EventBusInMemory'
import { IdeaRepositorySQLite } from '@/idea/adapters/IdeaRepositorySQLite'
import { CompetitorAnalysisEvaluator } from '@/idea/adapters/OpenAIService/CompetitorAnalysisEvaluator'
import { ContentIdeasEvaluator } from '@/idea/adapters/OpenAIService/ContentIdeasEvaluator'
import { ContextAnalysisEvaluator } from '@/idea/adapters/OpenAIService/ContextAnalysisEvaluator'
import { ElevatorPitchesEvaluator } from '@/idea/adapters/OpenAIService/ElevatorPitchesEvaluator'
import { GoogleTrendsKeywordsEvaluator } from '@/idea/adapters/OpenAIService/GoogleTrendsKeywordsEvaluator'
import { MarketAnalysisEvaluator } from '@/idea/adapters/OpenAIService/MarketAnalysisEvaluator'
import { UserMessageBuilder } from '@/idea/adapters/OpenAIService/MessageBuilder'
import { PotentialNamesEvaluator } from '@/idea/adapters/OpenAIService/PotentialNamesEvaluator'
import { SWOTAnalysisEvaluator } from '@/idea/adapters/OpenAIService/SWOTAnalysisEvaluator'
import { SocialMediaCampaignsEvaluator } from '@/idea/adapters/OpenAIService/SocialMediaCampaignsEvaluator'
import { TestingPlanEvaluator } from '@/idea/adapters/OpenAIService/TestingPlanEvaluator'
import { ValuePropositionEvaluator } from '@/idea/adapters/OpenAIService/ValuePropositionEvaluator'
import { Application } from '@/idea/app/App'
import { ArchivationHandler } from '@/idea/app/commands/Archive'
import { MakeReservationHandler } from '@/idea/app/commands/MakeReservation'
import { RequestSocialMediaCampaignsHandler } from '@/idea/app/commands/RequestSocialMediaCampaigns'
import { GetIdeaHandler } from '@/idea/app/queries/GetIdea'
import { GetSocialMediaCampaignsHandler } from '@/idea/app/queries/GetSocialMediaCampaigns'
import { ContextAnalysisEvaluated } from '@/idea/domain/events/ContextAnalysisEvaluated'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { SocialMediaCampaignsRequested } from '@/idea/domain/events/SocialMediaCampaignsRequested'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { CompetitorAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/CompetitorAnalysisEvaluationSubscriber'
import { ContentIdeasEvaluationSubscriber } from '@/idea/events/subscribers/ContentIdeasEvaluationSubscriber'
import { ContextAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/ContextAnalysisEvaluationSubscriber'
import { ElevatorPitchesEvaluationSubscriber } from '@/idea/events/subscribers/ElevatorPitchesEvaluationSubscriber'
import { GoogleTrendsKeywordsEvaluationSubscriber } from '@/idea/events/subscribers/GoogleTrendsKeywordsEvaluationSubscriber'
import { MarketAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/MarketAnalysisEvaluationSubscriber'
import { PotentialNamesEvaluationSubscriber } from '@/idea/events/subscribers/PotentialNamesEvaluationSubscriber'
import { SWOTAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/SWOTAnalysisEvaluationSubscriber'
import { SocialMediaCampaignsSubscriber } from '@/idea/events/subscribers/SocialMediaCampaignsSubscriber'
import { TestingPlanEvaluationSubscriber } from '@/idea/events/subscribers/TestingPlanEvaluationSubscriber'
import { ValuePropositionEvaluationSubscriber } from '@/idea/events/subscribers/ValuePropositionEvaluationSubscriber'
import { env } from '@/lib/env'

const registerApp = (): Application => {
  const ideaRepository = new IdeaRepositorySQLite()
  const eventBus = new EventBusInMemory()
  const ideaService = new IdeaService(env.CONCEPT_SERVICE_API_BASE)
  const messageBuilder = new UserMessageBuilder()

  const contextAnalysisEvaluationSubscriber =
    new ContextAnalysisEvaluationSubscriber(
      ideaRepository,
      new ContextAnalysisEvaluator(env.OPENAI_API_KEY, messageBuilder),
      eventBus
    )

  const valuePropositionEvaluationSubscriber =
    new ValuePropositionEvaluationSubscriber(
      ideaRepository,
      new ValuePropositionEvaluator(env.OPENAI_API_KEY, messageBuilder),
      eventBus
    )

  const marketAnalysisEvaluationSubscriber =
    new MarketAnalysisEvaluationSubscriber(
      ideaRepository,
      new MarketAnalysisEvaluator(env.OPENAI_API_KEY, messageBuilder)
    )

  const competitorAnalysisEvaluationSubscriber =
    new CompetitorAnalysisEvaluationSubscriber(
      ideaRepository,
      new CompetitorAnalysisEvaluator(env.OPENAI_API_KEY, messageBuilder)
    )

  const potentialNamesEvaluationSubscriber =
    new PotentialNamesEvaluationSubscriber(
      ideaRepository,
      new PotentialNamesEvaluator(env.OPENAI_API_KEY, messageBuilder)
    )

  const swotAnalysisEvaluationSubscriber = new SWOTAnalysisEvaluationSubscriber(
    ideaRepository,
    new SWOTAnalysisEvaluator(env.OPENAI_API_KEY, messageBuilder)
  )

  const elevatorPitchesEvaluationSubscriber =
    new ElevatorPitchesEvaluationSubscriber(
      ideaRepository,
      new ElevatorPitchesEvaluator(env.OPENAI_API_KEY, messageBuilder)
    )

  const googleTrendsKeywordsEvaluationSubscriber =
    new GoogleTrendsKeywordsEvaluationSubscriber(
      ideaRepository,
      new GoogleTrendsKeywordsEvaluator(env.OPENAI_API_KEY, messageBuilder)
    )

  const contentIdeasEvaluationSubscriber = new ContentIdeasEvaluationSubscriber(
    ideaRepository,
    new ContentIdeasEvaluator(env.OPENAI_API_KEY, messageBuilder)
  )

  const socialMediaCampaignsSubscriber = new SocialMediaCampaignsSubscriber(
    ideaRepository,
    new SocialMediaCampaignsEvaluator(env.OPENAI_API_KEY, messageBuilder)
  )

  const testingPlanEvaluationSubscriber = new TestingPlanEvaluationSubscriber(
    ideaRepository,
    new TestingPlanEvaluator(env.OPENAI_API_KEY, messageBuilder)
  )

  eventBus.subscribe(IdeaCreated.eventName, contextAnalysisEvaluationSubscriber)
  eventBus.subscribe(
    ContextAnalysisEvaluated.eventName,
    valuePropositionEvaluationSubscriber
  )
  eventBus.subscribe(
    ContextAnalysisEvaluated.eventName,
    marketAnalysisEvaluationSubscriber
  )
  eventBus.subscribe(
    ContextAnalysisEvaluated.eventName,
    competitorAnalysisEvaluationSubscriber
  )
  eventBus.subscribe(
    ContextAnalysisEvaluated.eventName,
    potentialNamesEvaluationSubscriber
  )
  eventBus.subscribe(
    ValuePropositionEvaluated.eventName,
    swotAnalysisEvaluationSubscriber
  )
  eventBus.subscribe(
    ValuePropositionEvaluated.eventName,
    elevatorPitchesEvaluationSubscriber
  )
  eventBus.subscribe(
    ValuePropositionEvaluated.eventName,
    googleTrendsKeywordsEvaluationSubscriber
  )
  eventBus.subscribe(
    ValuePropositionEvaluated.eventName,
    contentIdeasEvaluationSubscriber
  )
  eventBus.subscribe(
    ValuePropositionEvaluated.eventName,
    testingPlanEvaluationSubscriber
  )
  eventBus.subscribe(
    SocialMediaCampaignsRequested.eventName,
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
