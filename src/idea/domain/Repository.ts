import { Idea } from '@/idea/domain/Aggregate'
import { TargetAudience } from '@/idea/domain/TargetAudience'
import { ValueProposition } from '@/idea/domain/ValueProposition'

export interface Repository {
  addIdea(idea: Idea): Promise<void>
  updateIdea(id: string, updateFn: (idea: Idea) => Idea): Promise<void>
  getById(id: string): Promise<Idea | null>
  getTargetAudiencesByIdeaId(ideaId: string): Promise<TargetAudience[]>
  getValuePropositionByIdeaId(ideaId: string): Promise<ValueProposition | null>
}
