import * as Sentry from '@sentry/nextjs'
import { Concept } from '@/concept/domain/Aggregate'

type Query = {
  id: string
}

interface ReadModel {
  getById(id: string): Promise<Concept | null>
}

export class GetConceptHandler {
  constructor(private readonly readModel: ReadModel) {}

  async handle(query: Query): Promise<Concept> {
    Sentry.setTag('component', 'Query')
    Sentry.setTag('query_type', 'GetConcept')
    Sentry.setTag('concept_id', query.id)

    try {
      const concept = await this.readModel.getById(query.id)

      if (!concept) {
        throw new Error(`Concept ${query.id} does not exist`)
      }

      if (!concept.isAvailable()) {
        throw new Error('Concept is not available anymore')
      }

      return concept
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
