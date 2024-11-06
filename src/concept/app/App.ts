import { AcceptConceptHandler } from '@/concept/app/commands/AcceptConcept'
import { EvaluateConceptHandler } from '@/concept/app/commands/EvaluateConcept'
import { GetConceptHandler } from '@/concept/app/queries/GetConcept'

export type Application = {
  Commands: Commands
  Queries: Queries
}

type Commands = {
  EvaluateConcept: EvaluateConceptHandler
  AcceptConcept: AcceptConceptHandler
}

type Queries = {
  GetConcept: GetConceptHandler
}
