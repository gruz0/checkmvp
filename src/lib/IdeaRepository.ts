import { Idea } from '@/lib/Idea'

export interface IdeaRepository {
  save(idea: Idea): Promise<void>
  findById(id: string): Promise<Idea | null>
  findAll(): Promise<Idea[]>
}
