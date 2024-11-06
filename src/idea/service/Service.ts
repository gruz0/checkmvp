import { Service as IdeaService } from '@/common/client/Concept/Service'
import { EventBusInMemory } from '@/idea/adapters/EventBusInMemory'
import { IdeaRepositorySQLite } from '@/idea/adapters/IdeaRepositorySQLite'
import { CompetitorAnalysisEvaluator } from '@/idea/adapters/OpenAIService/CompetitorAnalysisEvaluator'
import { MarketAnalysisEvaluator } from '@/idea/adapters/OpenAIService/MarketAnalysisEvaluator'
import { TargetAudienceEvaluator } from '@/idea/adapters/OpenAIService/TargetAudienceEvaluator'
import { ValuePropositionEvaluator } from '@/idea/adapters/OpenAIService/ValuePropositionEvaluator'
import { Application } from '@/idea/app/App'
import { MakeReservationHandler } from '@/idea/app/commands/MakeReservation'
import { GetIdeaHandler } from '@/idea/app/queries/GetIdea'
import { CompetitorAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/CompetitorAnalysisEvaluationSubscriber'
import { MarketAnalysisEvaluationSubscriber } from '@/idea/events/subscribers/MarketAnalysisEvaluationSubscriber'
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
      new ValuePropositionEvaluator(env.OPENAI_API_KEY)
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

  eventBus.subscribe('IdeaCreated', targetAudienceEvaluationSubscriber)
  eventBus.subscribe('IdeaCreated', valuePropositionEvaluationSubscriber)
  eventBus.subscribe('IdeaCreated', marketAnalysisEvaluationSubscriber)
  eventBus.subscribe('IdeaCreated', competitorAnalysisEvaluationSubscriber)

  return {
    Commands: {
      MakeReservation: new MakeReservationHandler(
        ideaRepository,
        ideaService,
        eventBus
      ),
    },
    Queries: {
      GetIdea: new GetIdeaHandler(ideaRepository),
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
