import { Service as IdeaService } from '@/common/client/Idea/Service'
import { SystemTimeProvider } from '@/common/domain/TimeProvider'
import { ConceptRepositorySQLite } from '@/concept/adapters/ConceptRepositorySQLite'
import { EventBusInMemory } from '@/concept/adapters/EventBusInMemory'
import { ConceptEvaluator } from '@/concept/adapters/OpenAIService/ConceptEvaluator'
import { Application } from '@/concept/app/App'
import { AcceptConceptHandler } from '@/concept/app/commands/AcceptConcept'
import { EvaluateConceptHandler } from '@/concept/app/commands/EvaluateConcept'
import { GetConceptHandler } from '@/concept/app/queries/GetConcept'
import { Service } from '@/concept/domain/anonymization/AnonymizationService'
import { ConceptAnonymizationSubscriber } from '@/concept/events/subscribers/ConceptAnonymizationSubscriber'
import { ConceptEvaluationSubscriber } from '@/concept/events/subscribers/ConceptEvaluationSubscriber'
import { ConceptTransitionSubscriber } from '@/concept/events/subscribers/ConceptTransitionSubscriber'
import { env } from '@/lib/env'

const registerApp = (): Application => {
  const conceptRepository = new ConceptRepositorySQLite(
    new SystemTimeProvider(),
    env.CONCEPT_EXPIRATION_DAYS
  )
  const eventBus = new EventBusInMemory()
  const ideaService = new IdeaService(env.IDEA_SERVICE_API_BASE)

  const conceptEvaluationSubscriber = new ConceptEvaluationSubscriber(
    conceptRepository,
    new ConceptEvaluator(env.OPENAI_API_KEY),
    eventBus
  )

  const conceptTransitionSubscriber = new ConceptTransitionSubscriber(
    conceptRepository,
    eventBus
  )

  eventBus.subscribe('ConceptCreated', conceptEvaluationSubscriber)
  eventBus.subscribe('ConceptAccepted', conceptTransitionSubscriber)

  if (env.ANONYMIZE_CONCEPTS) {
    const conceptAnonymizationSubscriber = new ConceptAnonymizationSubscriber(
      conceptRepository,
      new Service()
    )

    eventBus.subscribe('ConceptTransitioned', conceptAnonymizationSubscriber)
  }

  return {
    Commands: {
      EvaluateConcept: new EvaluateConceptHandler(
        conceptRepository,
        eventBus,
        new SystemTimeProvider(),
        env.CONCEPT_EXPIRATION_DAYS
      ),
      AcceptConcept: new AcceptConceptHandler(
        conceptRepository,
        ideaService,
        eventBus
      ),
    },
    Queries: {
      GetConcept: new GetConceptHandler(conceptRepository),
    },
  }
}

const globalForApp = global as unknown as {
  conceptApp: Application | undefined
}

const conceptApp = globalForApp.conceptApp ?? registerApp()

if (process.env.NODE_ENV !== 'production') {
  globalForApp.conceptApp = conceptApp
}

export { conceptApp as App }
