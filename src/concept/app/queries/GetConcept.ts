import { Concept } from '@/concept/domain/Aggregate'

export type Query = {
  id: string
}

interface ReadModel {
  getById(id: string): Promise<Concept | null>
}

export class GetConceptHandler {
  constructor(private readonly readModel: ReadModel) {}

  async handle(query: Query): Promise<Concept> {
    const concept = await this.readModel.getById(query.id)

    if (!concept) {
      throw new Error(`Concept ${query.id} does not exist`)
    }

    if (!concept.isAvailable()) {
      throw new Error('Concept is not available anymore')
    }

    return concept
  }
}
