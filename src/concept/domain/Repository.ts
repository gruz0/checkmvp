import { Concept } from './Aggregate'

export interface Repository {
  addConcept(concept: Concept): Promise<void>
  updateConcept(
    id: string,
    updateFn: (concept: Concept) => Concept
  ): Promise<void>
  getById(id: string): Promise<Concept | null>
  getTotal(): Promise<number>
}
